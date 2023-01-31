type Coordinates = {
  x: number,
  y: number
}

abstract class MyGraphicsPrimitive2D {

  leftTopPoint?: Coordinates
  rightBottomPoint?: Coordinates

  protected constructor() {
    this.leftTopPoint = undefined
    this.rightBottomPoint = undefined
  }

  movePrimitive = (shift: Coordinates): void => {
    if (this.leftTopPoint && this.rightBottomPoint) {
      this.leftTopPoint.x += shift.x
      this.leftTopPoint.y += shift.y
      this.rightBottomPoint.x += shift.x
      this.rightBottomPoint.y += shift.y
    }
  }
}

abstract class MyAreaPrimitive2D extends MyGraphicsPrimitive2D {

  protected constructor() {
    super();
  }

  abstract getArea(): number
}

class MyCircle extends MyAreaPrimitive2D {

  centerOfCircle: Coordinates
  radius: number

  constructor(centerOfCircle: Coordinates, radius: number) {
    super()
    this.centerOfCircle = centerOfCircle
    this.radius = radius
    this.leftTopPoint = {x: 0, y: 0}
    this.rightBottomPoint = {x: radius * 2, y: radius * 2}
  }

  getArea(): number {
    return Math.PI * Math.pow(this.radius, 2)
  }
}

class MyRectangle extends MyAreaPrimitive2D {

  width: number
  height: number

  constructor(width: number, height: number) {
    super()
    this.width = width
    this.height = height
    this.leftTopPoint = {x: 0, y: 0}
    this.rightBottomPoint = {x: width, y: height}
  }

  getArea(): number {
    return this.width * this.height
  }
}

const rectangle = new MyRectangle(3, 6)
const circle = new MyCircle({x: 2, y: 4}, 6)

rectangle.movePrimitive({x: 5, y: 4})
rectangle.getArea()

circle.movePrimitive({x: 5, y: 4})
circle.getArea()
