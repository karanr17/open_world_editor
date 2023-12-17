class Graph {
  constructor(points = [], segments = []) {
    this.points = points;
    this.segements = segments;
  }

  addPoint(point) {
    this.points.push(point);
  }

  addSegment(seg) {
    this.segements.push(seg);
  }

  containsPoint(point) {
    return this.points.find(p => p.equals(point));
  }

  containsSegment(seg) {
    return this.segements.find(s => s.equals(seg));
  }

  tryAddPoint(point) {
    if (!this.containsPoint(point)) {
      this.addPoint(point);
      return true;
    }
    return false;
  }

  tryAddSegment(seg) {
    if (!this.containsSegment(seg)) {
      this.addSegment(seg);
      return true;
    }
    return false;
  }

  removePoint(point) {
    const segs = this.getSegmentsWithPoint(point);
    for (const seg of segs) {
      this.removeSegement(seg);
    }
    this.points.splice(this.points.indexOf(point), 1);
  }

  removeSegement(seg) {
    this.segements.splice(this.segements.indexOf(seg), 1);
  }
  
  getSegmentsWithPoint(point) {
    const segs = [];
    for (const seg of this.segements) {
      if (seg.includes(point)){
        segs.push(seg);
      }
    }
    return segs;
  }

  draw(ctx) {
    for(const seg of this.segements) {
      seg.draw(ctx);
    }

    for(const point of this.points) {
      point.draw(ctx);
    }
  }
}