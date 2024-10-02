class DrawPictures {
      cvs: HTMLCanvasElement;
      ctx: CanvasRenderingContext2D;
      startPoint = [0, 0];
      constructor(cvs: HTMLCanvasElement) {
            this.cvs = cvs;
            const ctx = cvs.getContext('2d');
            if (!ctx) throw new Error('CanvasRenderingContext2D is null');
            this.ctx = ctx;
            this.drawBg(0, 0, cvs.width, cvs.height);
            this.initEvent();
      }
      drawBg(x: number, y: number, w: number, h: number) {
            this.ctx.fillStyle = 'white';
            this.ctx.fillRect(x, y, w, h);
      }
      draw(e: MouseEvent) {
            let { ctx, startPoint } = this;
            const [x, y] = [e.offsetX, e.offsetY];
            const curPoint = [x, y];
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(startPoint[0], startPoint[1]);
            ctx.stroke();
            ctx.closePath();
            this.startPoint = curPoint;
      }
      initEvent() {
            const _this = this;
            const { cvs } = this;
            const draw = this.draw.bind(this);
            const tmp = () => {
                  cvs.removeEventListener('mouseup', tmp);
                  cvs.removeEventListener('mousemove', draw);
            };
            cvs.addEventListener('mousedown', e => {
                  _this.startPoint = [e.offsetX, e.offsetY];
                  cvs.addEventListener('mousemove', draw);
                  cvs.addEventListener('mouseup', tmp);
            });
      }
      savePNG() {
            const url = this.cvs.toDataURL('image/png');
      }
}

export default DrawPictures;
