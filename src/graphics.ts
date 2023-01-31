type Coordinates = {
  x: number,
  y: number
}

abstract class MyGraphicsPrimitive2D {
  protected constructor() {
    this.leftTopPoint = undefined
    this.rightBottomPoint = undefined
  }

  leftTopPoint?: Coordinates
  rightBottomPoint?: Coordinates

  translatePrimitive = (coordinates: Coordinates): void => {
    if (this.leftTopPoint && this.rightBottomPoint) {
      this.leftTopPoint.x = this.leftTopPoint.x + coordinates.x
      this.leftTopPoint.y = this.leftTopPoint.y + coordinates.y
      this.rightBottomPoint.x = this.rightBottomPoint.x + coordinates.x
      this.rightBottomPoint.y = this.rightBottomPoint.y + coordinates.y
    }
  }
}

abstract class MyAreaPrimitive2D extends MyGraphicsPrimitive2D {
  protected constructor() {
    super();
  }

  abstract getSpace(): number
}

class MyCircle extends MyGraphicsPrimitive2D {
  constructor(centerPoint: Coordinates, radius: number) {
    super()
    this.centerPoint = centerPoint
    this.radius = radius
    this.leftTopPoint = {x: 0, y: 0}
    this.rightBottomPoint = {x: 2 * radius, y: 2 *radius}
  }

  centerPoint: Coordinates
  radius: number

  getSpace(): number {
    return 3.14 * (this.radius * this.radius)
  }
}

class MyRectangle extends MyAreaPrimitive2D {
  constructor(width: number, height: number) {
    // @ts-ignore
    super()
    this.width = width
    this.height = height
    this.leftTopPoint = {x: 0, y: 0}
    this.rightBottomPoint = {x: height, y: width}
  }
  width: number
  height: number

  getSpace(): number {
    return this.width * this.height
  }
}

const rect = new MyRectangle(3, 6)
const circle = new MyCircle({x: 2, y: 4}, 6)

rect.translatePrimitive({x: 5, y: 4})
rect.getSpace()

circle.translatePrimitive({x: 5, y: 4})
circle.getSpace()
