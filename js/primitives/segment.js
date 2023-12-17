class Segment {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  }

  includes(point) {
    if (point == this.p1 || point == this.p2) {
      return true;
    }
    return false;
  }

  equals(seg) {
    if (this.p1 == seg.p1 && this.p2 == seg.p2 || this.p2 == seg.p1 && this.p1 == seg.p2) {
      return true;
    }
    return false;
  }

  draw(ctx, { width = 2, color = "black", dash = [] } = {}) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.setLineDash(dash);
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.stroke();
    ctx.setLineDash([]);
  }
}