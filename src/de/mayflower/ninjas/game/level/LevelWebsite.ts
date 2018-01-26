
    import * as Matter from 'matter-js';
    import * as ninjas from '../../ninjas';

    /*******************************************************************************************************************
    *   The level set for the dev level.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export class LevelWebsite extends ninjas.Level
    {
        /** The width of this level. */
        public      width                   :number                     = 10000.0;
        /** The height of this level. */
        public      height                  :number                     = 10000.0;

        /***************************************************************************************************************
        *   Inits a new level.
        ***************************************************************************************************************/
        protected createGameObjects()
        {
            // init player
            this.player = new ninjas.Player( 100, 500.0, ninjas.CharacterLookingDirection.RIGHT );

            // setup all game objects
            this.gameObjects =
            [
                // grounds and walls
                ninjas.GameObjectFactory.createBlock( 0,    250,  750, 15, 0.0,  false ),
                ninjas.GameObjectFactory.createBlock( 0,    1000, 750, 15, 0.0,  false ),
/*
                ninjas.GameObjectFactory.createBlock( 490,  765, 500, 15, 15.0, false ),
                ninjas.GameObjectFactory.createBlock( 980,  830, 500, 15, 0.0,  false ),
                ninjas.GameObjectFactory.createBlock( 2310, 830, 500, 15, 0.0,  false ),
                ninjas.GameObjectFactory.createBlock( 3230, 830, 500, 15, 0.0,  false ),
                ninjas.GameObjectFactory.createBlock( 4080, 730, 500, 15, 0.0,  false ),
*/
/*
                // bg decoration
                ninjas.GameObjectFactory.createDecoration( 30,   450, 76, 170, ninjas.Image.IMAGE_TREE ),
                ninjas.GameObjectFactory.createDecoration( 370, 450, 76, 170, ninjas.Image.IMAGE_TREE ),

                // moveable boxes
                ninjas.GameObjectFactory.createBox(    300,  160, 80, 80, ninjas.GameObject.FRICTION_ICE, ninjas.GameObject.DENSITY_DEFAULT ),
                ninjas.GameObjectFactory.createSphere( 350,  240, 80,     ninjas.GameObject.FRICTION_ICE, ninjas.GameObject.DENSITY_DEFAULT ),
                ninjas.GameObjectFactory.createBox(    400,  320, 80, 80, ninjas.GameObject.FRICTION_ICE, ninjas.GameObject.DENSITY_DEFAULT ),
                ninjas.GameObjectFactory.createBox(    450,  400, 80, 80, ninjas.GameObject.FRICTION_ICE, ninjas.GameObject.DENSITY_DEFAULT ),
                ninjas.GameObjectFactory.createSphere( 500,  320, 80,     ninjas.GameObject.FRICTION_ICE, ninjas.GameObject.DENSITY_DEFAULT ),
                ninjas.GameObjectFactory.createBox(    550,  240, 80, 80, ninjas.GameObject.FRICTION_ICE, ninjas.GameObject.DENSITY_DEFAULT ),
                ninjas.GameObjectFactory.createBox(    600,  160, 80, 80, ninjas.GameObject.FRICTION_ICE, ninjas.GameObject.DENSITY_DEFAULT ),
                ninjas.GameObjectFactory.createSphere( 650,  80,  80,     ninjas.GameObject.FRICTION_ICE, ninjas.GameObject.DENSITY_DEFAULT ),
                ninjas.GameObjectFactory.createBox(    700,  0,   80, 80, ninjas.GameObject.FRICTION_ICE, ninjas.GameObject.DENSITY_DEFAULT ),

                ninjas.GameObjectFactory.createBox(    1300, -3160, 80, 80, ninjas.GameObject.FRICTION_ICE, ninjas.GameObject.DENSITY_DEFAULT ),
                ninjas.GameObjectFactory.createSphere( 1350, -3240, 80,     ninjas.GameObject.FRICTION_ICE, ninjas.GameObject.DENSITY_DEFAULT ),
                ninjas.GameObjectFactory.createBox(    1400, -3320, 80, 80, ninjas.GameObject.FRICTION_ICE, ninjas.GameObject.DENSITY_DEFAULT ),
                ninjas.GameObjectFactory.createBox(    1450, -3400, 80, 80, ninjas.GameObject.FRICTION_ICE, ninjas.GameObject.DENSITY_DEFAULT ),
                ninjas.GameObjectFactory.createSphere( 1500, -3320, 80,     ninjas.GameObject.FRICTION_ICE, ninjas.GameObject.DENSITY_DEFAULT ),
                ninjas.GameObjectFactory.createBox(    1550, -3240, 80, 80, ninjas.GameObject.FRICTION_ICE, ninjas.GameObject.DENSITY_DEFAULT ),
                ninjas.GameObjectFactory.createBox(    1600, -3160, 80, 80, ninjas.GameObject.FRICTION_ICE, ninjas.GameObject.DENSITY_DEFAULT ),
                ninjas.GameObjectFactory.createSphere( 1650, -3180, 80,     ninjas.GameObject.FRICTION_ICE, ninjas.GameObject.DENSITY_DEFAULT ),
                ninjas.GameObjectFactory.createBox(    1700, -3000, 80, 80, ninjas.GameObject.FRICTION_ICE, ninjas.GameObject.DENSITY_DEFAULT ),

                // sigsaws and bounces
                ninjas.GameObjectFactory.createSigsaw( 1490, 830,  400, 25, null ),
                ninjas.GameObjectFactory.createBounce( 1900, 830,  400, 25, null ),

                // animated platforms
                ninjas.GameObjectFactory.createPlatform
                (
                    200.0,
                    15.0,
                    null,
                    ninjas.Platform.SPEED_NORMAL,
                    [
                        Matter.Vector.create( 2820.0, 830.0 ),
                        Matter.Vector.create( 3020.0, 830.0 ),
                    ]
                ),

                // items
                ninjas.GameObjectFactory.createItem( 900,  620 ),
                ninjas.GameObjectFactory.createItem( 950,  620 ),
                ninjas.GameObjectFactory.createItem( 1000, 620 ),
                ninjas.GameObjectFactory.createItem( 2500, 740 ),
                ninjas.GameObjectFactory.createItem( 2550, 740 ),
                ninjas.GameObjectFactory.createItem( 2600, 740 ),

                // free form
                ninjas.GameObjectFactory.createFreeForm(
                    3730.0,
                    730.0,
                    [
                        Matter.Vector.create( 0.0,   0.0    ),
                        Matter.Vector.create( 350.0, -100.0 ),
                        Matter.Vector.create( 350.0, -85.0  ),
                        Matter.Vector.create( 0.0,   15.0   ),
                    ],
                    0.0
                ),

                // ascending ramp
                ninjas.GameObjectFactory.createElevatedRamp( 4600.0, 730.0, 1000.0, 15.0, -200.0 ),
*/
                // player
                this.player,
/*
                // enemies (fg)
                ninjas.GameObjectFactory.createEnemy( 1200, 0 ),

                // fg decoration
                ninjas.GameObjectFactory.createDecoration( 200,  450, 76, 170, ninjas.Image.IMAGE_TREE ),
                ninjas.GameObjectFactory.createDecoration( 3230, 660, 76, 170, ninjas.Image.IMAGE_TREE ),
*/
            ];
        }
    }
