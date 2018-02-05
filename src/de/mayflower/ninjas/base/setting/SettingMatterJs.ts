
    import * as matter from 'matter-js';

    /*******************************************************************************************************************
    *   All adjustments and balancings for the Matter.js engine.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export class SettingMatterJs
    {
        /** Highest surface friction. */
        public  static  readonly    FRICTION_CONCRETE                           :number                     = 1.0;
        /** Default surface friction. */
        public  static  readonly    FRICTION_DEFAULT                            :number                     = 0.1;
        /** Low surface friction. */
        public  static  readonly    FRICTION_GLASS                              :number                     = 0.01;
        /** Lowest surface friction. */
        public  static  readonly    FRICTION_ICE                                :number                     = 0.0;

        /** Character density. */
        public  static  readonly    DENSITY_HUMAN                               :number                     = 0.01;
        /** Default density. */
        public  static  readonly    DENSITY_DEFAULT                             :number                     = 0.001;

        /** The default jump power. */
        public  static  readonly    PLAYER_JUMP_POWER                           :number                     = -25.0;
        /** The player's speed in world coordinate per tick. */
        public  static  readonly    PLAYER_SPEED_MOVE                           :number                     = 7.5;

        /** The default vertical gravity for all levels. */
        public  static  readonly    DEFAULT_GRAVITY_Y                           :number                     = 1.0;

        /** The default collision group for all game objects. */
        public  static  readonly    COLLISION_GROUP_COLLIDING                   :matter.ICollisionFilter    =
        {
                category: 0x0001,
                mask:     0x0002,
                group:    0x0003,
        };

        /** The collision group for all non-colliding items. */
        public  static  readonly    COLLISION_GROUP_NON_COLLIDING_ITEM          :matter.ICollisionFilter    =
        {
                category: 0x0004,
                mask:     0x0005,
                group:    0x0006,
        };

        /** The collision group for all non-colliding decos. */
        public  static  readonly    COLLISION_GROUP_NON_COLLIDING_DECO          :matter.ICollisionFilter    =
        {
                category: 0x0007,
                mask:     0x0008,
                group:    0x0009,
        };

        /** The collision group for all non-colliding dead enemies. */
        public  static  readonly    COLLISION_GROUP_NON_COLLIDING_DEAD_ENEMY    :matter.ICollisionFilter    =
        {
                category: 0x0010,
                mask:     0x0011,
                group:    0x0012,
        };
    }