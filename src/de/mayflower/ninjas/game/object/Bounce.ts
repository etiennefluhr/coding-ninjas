
    import * as Matter from 'matter-js';
    import * as ninjas from '../../ninjas';

    /*******************************************************************************************************************
    *   Represents a bounce.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export class Bounce extends ninjas.GameObject
    {
        /** The constraint that builds the turning point for the bounce. */
        private                     constraint                      :Matter.Constraint                  = null;

        /***************************************************************************************************************
        *   Creates a new bounce.
        *
        *   @param shape  The shape for this object.
        *   @param x      Startup position X.
        *   @param y      Startup position Y.
        *   @param image  The image for this game object.
        ***************************************************************************************************************/
        public constructor(shape:ninjas.Shape, x:number, y:number, image:string )
        {
            super
            (
                shape,
                x,
                y,
                image
            );

            this.constraint = Matter.Constraint.create(
                {
                    bodyB: this.shape.body,
                    pointA: { x: this.shape.body.position.x, y: this.shape.body.position.y },
                    pointB: { x: 0, y: 0 },
                    stiffness: 0.01,
                    length: 0,
                    render: {
                        strokeStyle: ninjas.Setting.COLOR_DEBUG_BOUNCE_JOINT,
                        lineWidth: 1.0,
                        visible:   true,
                    }
                }
            );

            Matter.Composite.add(
                ninjas.Main.game.engine.world,
                this.constraint
            );
        }

        /***************************************************************************************************************
        *   Renders this sigsaw.
        ***************************************************************************************************************/
        public render()
        {
            Matter.Body.setAngle(           this.shape.body, 0.0 );
            Matter.Body.setAngularVelocity( this.shape.body, 0.0 );
        }
    }
