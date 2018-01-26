
    import * as Matter from 'matter-js';
    import * as ninjas from '../../ninjas';

    /*******************************************************************************************************************
    *   Represents a sigsaw.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export class SigSaw extends ninjas.GameObject
    {
        /** The constraint that builds the turning point for the sigsaw. */
        private                     constraint                      :Matter.Constraint                  = null;

        /***************************************************************************************************************
        *   Creates a new sigsaw.
        *
        *   @param shape  The shape for this object.
        *   @param x      Startup position X.
        *   @param y      Startup position Y.
        *   @param image  The image for this game object.
        ***************************************************************************************************************/
        public constructor( shape:ninjas.Shape, x:number, y:number, image:HTMLImageElement )
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
                    stiffness: 1.0,
                    length: 0,
                    render: {
                        strokeStyle: ninjas.Setting.COLOR_DEBUG_SIGSAW_JOINT,
                        lineWidth: 1.0,
                        visible:   true,
                    }
                }
            );
/*
            Matter.Body.setMass( this.body, 25.0 );
*/
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
            this.clipRotation();
            this.clipRotationSpeed();
        }

        /***************************************************************************************************************
        *   Clips the rotation of the sigsaw.
        ***************************************************************************************************************/
        private clipRotation()
        {
            const clipAngle = 15.0;

            const minAngle = ninjas.MathUtil.angleToRad( -clipAngle );
            const maxAngle = ninjas.MathUtil.angleToRad( clipAngle  );

            if ( this.shape.body.angle < minAngle )
            {
                Matter.Body.setAngle(           this.shape.body, minAngle );
                Matter.Body.setAngularVelocity( this.shape.body, 0.0       );
            }
            else if ( this.shape.body.angle > maxAngle )
            {
                Matter.Body.setAngle(           this.shape.body, maxAngle );
                Matter.Body.setAngularVelocity( this.shape.body, 0.0       );
            }
        }

        /***************************************************************************************************************
        *   Clips the rotation speed of the sigsaw.
        ***************************************************************************************************************/
        private clipRotationSpeed()
        {
            const maxRotationSpeed = 0.005;

            if ( this.shape.body.angularVelocity < -maxRotationSpeed )
            {
                Matter.Body.setAngularVelocity( this.shape.body, -maxRotationSpeed );
            }
            else if ( this.shape.body.angularVelocity > maxRotationSpeed )
            {
                Matter.Body.setAngularVelocity( this.shape.body, maxRotationSpeed );
            }
        }
    }
