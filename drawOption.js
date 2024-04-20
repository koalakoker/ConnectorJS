class DrawOption {
  constructor(
    showAnchor = false,
    showAnchorLabel = false,
    showOrigin = false,
    originAlign = "S",
    showBounds = false
  ) {
    this.showAnchor = showAnchor;
    this.showAnchorLabel = showAnchorLabel;
    this.showOrigin = showOrigin;
    this.originAlign = originAlign;
    this.showBounds = showBounds;
  }
}
