class GraphEditor {
  constructor(canvas, grpah) {
    this.canvas = canvas;
    this.graph = graph;

    // graph context
    this.ctx = this.canvas.getContext("2d");

    // point attributes
    this.selected = null;
    this.hovered = null;
    this.mouseClick = null;
    this.dragging = false;

    // private functions
    this.#addEventListeners();
  };

  #addEventListeners() {
    this.canvas.addEventListener("mousedown", this.#handleMouseDown.bind(this));
    this.canvas.addEventListener("mousemove", this.#handleMouseMove.bind(this));
    this.canvas.addEventListener("contextmenu", (evt) => {
      evt.preventDefault();
    });
    this.canvas.addEventListener("mouseup", () => {
      this.dragging = false;
    });
  }

  #handleMouseDown(evt) {
    if (evt.button == 2) { // right click
      if (this.selected) {
        this.selected = null;
      } else if (this.hovered) {
        this.#removePoint(this.hovered);
      }
    }
    if (evt.button == 0) { // left click
      this.hovered = getNearestPoint(this.mouseClick, this.graph.points, 10);
      if (this.hovered) {
        this.#select(this.hovered);
        this.selected = this.hovered;
        this.dragging = true;
        return;
      }
      this.graph.addPoint(this.mouseClick);
      this.#select(this.mouseClick);
      this.selected = this.mouseClick;
    }
  }

  #handleMouseMove(evt) {
    this.mouseClick = new Point(evt.offsetX, evt.offsetY);
    this.hovered = getNearestPoint(this.mouseClick, this.graph.points, 10);
    if (this.dragging) {
      this.selected.x = this.mouseClick.x;
      this.selected.y = this.mouseClick.y;
    }
  }

  #removePoint(point) {
    this.graph.removePoint(point);
    this.hovered = null;
    if (this.selected == point) {
      this.selected = null;
    }
  }

  #select(point) {
    if (this.selected) {
      this.graph.tryAddSegment(new Segment(this.selected, point));
    }
    this.selected = point;
  }

  display() {
    this.graph.draw(ctx);
    if (this.hovered) {
      this.hovered.draw(this.ctx, { fill: true });
    }
    if (this.selected) {
      const intent = this.hovered ? this.hovered : this.mouseClick;
      new Segment(this.selected, intent).draw(this.ctx, { dash: [4, 4] });
      this.selected.draw(this.ctx, { outline: true });
    }
  }
}