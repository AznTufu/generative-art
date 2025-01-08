import { Component } from 'react';
import '../style/canvas.scss';
import bird from '../assets/bird.png';
import { Pane } from "tweakpane";

interface CanvasProps {
  showCanvas1: boolean;
}

export default class Canvas extends Component<CanvasProps> {
  componentDidMount() {
    this.initializeCanvas();
    window.addEventListener("resize", this.resizeCanvas);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeCanvas);
  }

  initializeCanvas = () => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const canvas2 = document.getElementById("canvas2") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    const ctx2 = canvas2?.getContext("2d");
    const pane = new Pane();

    const params = {
      GRADIENT_1: "#ff0000",
      GRADIENT_2: "#ffae00",
      numBlocks: 20,
      traitsPerBlock: 40,
      variationRatio: 0.1,
      shapesNumber: 8,
      particlesNumber: 100,
      particlesColor: "#ffffff"
    }

    const birdImage = new Image();
    birdImage.src = bird;
    
    const redrawCanvas = () => {
      if (ctx) {
        this.applyGradient(ctx, canvas, params);
        this.drawBlocks(ctx, canvas, params);
        this.drawBlurredShapes(ctx, canvas, params);
        this.drawParticles(ctx, canvas, params);
        if (ctx2 && canvas2) {
          ctx2.drawImage(canvas, 0, 0);
        }
        this.drawBirdImage(birdImage, ctx, ctx2, canvas, canvas2);
      }
    };

    birdImage.onload = () => {
      if (ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
  
        if (canvas2 && ctx2) {
          canvas2.width = canvas.width;
          canvas2.height = canvas.height;
        }
  
        const lineWidth = 2;
        ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
        for (let x = 0; x < canvas.width; x += lineWidth * 4) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }

        redrawCanvas();

        pane.addBinding(params, "GRADIENT_1").on("change", redrawCanvas);
        pane.addBinding(params, "GRADIENT_2").on("change", redrawCanvas);
        pane.addBinding(params, "numBlocks", { min: 1, max: 100 }).on("change", redrawCanvas);
        pane.addBinding(params, "traitsPerBlock", { min: 1, max: 100 }).on("change", redrawCanvas);
        pane.addBinding(params, "variationRatio", { min: 0, max: 1 }).on("change", redrawCanvas);
        pane.addBinding(params, "shapesNumber", { min: 0, max: 30 }).on("change", redrawCanvas);
        pane.addBinding(params, "particlesNumber", { min: 0, max: 1000 }).on("change", redrawCanvas);
        pane.addBinding(params, "particlesColor").on("change", redrawCanvas);
      }
    };
  };

  resizeCanvas = () => {
    this.initializeCanvas();
  };

  applyGradient(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, params: { GRADIENT_1: string; GRADIENT_2: string }) {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, params.GRADIENT_1);
    gradient.addColorStop(1, params.GRADIENT_2);
  
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  drawBlocks(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, params: { numBlocks: number; traitsPerBlock: number; variationRatio: number }) {
    const numBlocks = params.numBlocks;
    const traitsPerBlock = params.traitsPerBlock;
    const blockWidth = canvas.width / numBlocks;
    const initialLineHeight = canvas.height * (0.2 + Math.random() * 0.3);
    const maxVariationRatio = params.variationRatio;

    for (let block = 0; block < numBlocks; block++) {
      let previousLineHeight = initialLineHeight + Math.random() * canvas.height * 0.2;

      for (let i = 0; i < traitsPerBlock; i++) {
        const x = block * blockWidth + (i * blockWidth) / traitsPerBlock;
        const variation = previousLineHeight * maxVariationRatio;
        const lineHeight = previousLineHeight + (Math.random() * 2 - 1) * variation;

        ctx.beginPath();
        ctx.moveTo(x, canvas.height - lineHeight);
        ctx.lineTo(x, canvas.height);
        ctx.lineWidth = Math.random() * 2 + 1;
        ctx.stroke();

        previousLineHeight = lineHeight;
      }
    }
  }

  drawBlurredShapes(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, params: { shapesNumber: number }) {
    const addBlurredShape = (x: number, y: number, size: number) => {
      const gradient = ctx.createRadialGradient(x, y, size / 5, x, y, size);
      gradient.addColorStop(0, "rgba(0, 0, 0, 0.3)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    };

    for (let i = 0; i < params.shapesNumber; i++) {
      addBlurredShape(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        100 + Math.random() * 200
      );
    }
  }

  drawParticles(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, params: { particlesColor, particlesNumber: number }) {
    const drawParticle = (x: number, y: number) => {
      ctx.fillStyle = params.particlesColor;
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    };

    for (let i = 0; i < params.particlesNumber; i++) {
      drawParticle(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      );
    }
  }

  drawBirdImage(
    birdImage: HTMLImageElement,
    ctx: CanvasRenderingContext2D,
    ctx2: CanvasRenderingContext2D | null,
    canvas: HTMLCanvasElement,
    canvas2: HTMLCanvasElement
  ) {
    const scaleFactor = Math.min(canvas.width / 1300, canvas.height / 950);
  
    const width = birdImage.width * scaleFactor;
    const height = birdImage.height * scaleFactor;
  
    const x = (canvas.width - width) / 2;
    const y = (canvas.height - height) / 2;

    ctx.drawImage(birdImage, 0, 0, birdImage.width, birdImage.height, x, y, width, height);
  
    if (ctx2 && canvas2) {
      const height = birdImage.height;
      const x2 = (canvas2.width - width) / 2;
      const y2 = (canvas2.height - height) / 2;
      ctx2.drawImage(birdImage, 0, 0, birdImage.width, birdImage.height, x2, y2, width, height);
    }
  }

  render() {
    return (
      <>
        {this.props.showCanvas1 ? (
          <div className='header'>
            <canvas id='canvas'></canvas>
          </div>
        ) : (
          <canvas id='canvas2'></canvas>
        )}
      </>
    );
  }
}