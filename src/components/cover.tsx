import React, { Component, createRef } from 'react';
import '../style/cover.scss';
import Canvas from './canvas';
import html2canvas from 'html2canvas';

export default class Cover extends Component {
  coverRef: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);
    // Initialisation de la référence de la div
    this.coverRef = createRef();
    this.handleDownload = this.handleDownload.bind(this);
  }

  async handleDownload() {
    if (this.coverRef.current) {
      const canvas = await html2canvas(this.coverRef.current);
      const link = document.createElement('a');
      link.download = 'cover-illustration.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  }

  render() {
    return (
      <section id="cover">
        <div className="cover-content">
          <div className="title">L’Entrave Invisible by NIRO</div>
          <div className="description">
            "L’Entrave Invisible" is a powerful song by NIRO that delves into the struggles and unseen barriers we face in life. It speaks to the resilience and determination needed to overcome obstacles and find freedom.
          </div>
        </div>
        <div className="cover-illustration" ref={this.coverRef}>
          <Canvas showCanvas1={false} />
          <div className="title">
            L’Entrave Invisible
            <div className="subtitle">NIRO</div>
            <div className="date">MARCH 31 2024</div>
          </div>
        </div>
        <button className='btn' onClick={this.handleDownload}>Download the cover</button>
      </section>
    );
  }
}
