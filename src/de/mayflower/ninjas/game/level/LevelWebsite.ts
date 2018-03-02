
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
        public      width                   :number                     = 16444.0;
        /** The height of this level. */
        public      height                  :number                     = 10000.0;

        /***************************************************************************************************************
        *   Inits a new level.
        ***************************************************************************************************************/
        protected createGameObjects()
        {
            // Prune these preliminary tryouts ...

            this.parallaxBgs =
            [
/*
                ninjas.GameObjectFactory.createParallaxDeco( 0,  2200, 1.0, ninjas.SpriteTemplate.createFromSingleImage( ninjas.Image.IMAGE_BG_TEST ) ),
*/
            ];

            ninjas.GameObjectBundleFactory.createEnemy( this, 2100, 5000, ninjas.CharacterLookingDirection.RIGHT, 2100, 3600 );
/*
            this.enemies =
            [
                // ninjas.GameObjectFactory.createEnemy( 2100, 5000, ninjas.CharacterLookingDirection.RIGHT ),
                //ninjas.GameObjectFactory.createEnemy( 3950, 4800, ninjas.CharacterLookingDirection.RIGHT ),
                //ninjas.GameObjectFactory.createEnemy( 6150, 4800, ninjas.CharacterLookingDirection.RIGHT ),
            ];
*/
            this.player = ninjas.GameObjectFactory.createPlayer
            (
                ninjas.SettingGame.PLAYER_START_POSITION_X,
                5000,   // ninjas.SettingGame.PLAYER_START_POSITION_Y,
                ninjas.CharacterLookingDirection.LEFT,
                ninjas.SpriteTemplate.SPRITE_NINJA_GIRL_STAND_RIGHT
            );

            this.siteTriggers =
            [
                ninjas.GameObjectFactory.createSiteTrigger( 700,   5000, ninjas.SiteContent.CONTENT_WELCOME,    ninjas.SitePanelAppearance.PLAYER_LOOKING, ninjas.SpriteTemplate.createFromSingleImage( ninjas.Image.IMAGE_SHRINE_BG_4 ) ),
                ninjas.GameObjectFactory.createSiteTrigger( 3670,  4800, ninjas.SiteContent.CONTENT_COMPANY,    ninjas.SitePanelAppearance.PLAYER_LOOKING, ninjas.SpriteTemplate.createFromSingleImage( ninjas.Image.IMAGE_SHRINE_BG_5 ) ),
                ninjas.GameObjectFactory.createSiteTrigger( 3530,  4060, ninjas.SiteContent.CONTENT_PHILOSOPHY, ninjas.SitePanelAppearance.PLAYER_LOOKING, ninjas.SpriteTemplate.createFromSingleImage( ninjas.Image.IMAGE_SHRINE_BG_3 ) ),
                ninjas.GameObjectFactory.createSiteTrigger( 7360,  4280, ninjas.SiteContent.CONTENT_SERVICES,   ninjas.SitePanelAppearance.PLAYER_LOOKING, ninjas.SpriteTemplate.createFromSingleImage( ninjas.Image.IMAGE_SHRINE_BG_1 ) ),
                ninjas.GameObjectFactory.createSiteTrigger( 12876, 4200, ninjas.SiteContent.CONTENT_REFERENCES, ninjas.SitePanelAppearance.PLAYER_LOOKING, ninjas.SpriteTemplate.createFromSingleImage( ninjas.Image.IMAGE_SHRINE_BG_2 ) ),
                ninjas.GameObjectFactory.createSiteTrigger( 14720, 5100, ninjas.SiteContent.CONTENT_CONTACT,    ninjas.SitePanelAppearance.PLAYER_LOOKING, ninjas.SpriteTemplate.createFromSingleImage( ninjas.Image.IMAGE_DOJO        ) ),
            ];

            this.parallaxFgs =
            [
            ];

            // shrine 1
            ninjas.GameObjectBundleFactory.createDeco(   this, 1180,  5000, ninjas.DecoPosition.BG, ninjas.Image.IMAGE_BUSH_1   );
            ninjas.GameObjectBundleFactory.createDeco(   this, 720,   5000, ninjas.DecoPosition.BG, ninjas.Image.IMAGE_STATUE_3 );
            ninjas.GameObjectBundleFactory.createShrine( this, 1110,  5000, true, true, ninjas.SiteContent.CONTENT_WELCOME      );

            // shrine 1 nature
            ninjas.GameObjectBundleFactory.createDecoSprite( this, 75,    5000, ninjas.DecoPosition.FG, ninjas.SpriteTemplate.SPRITE_GRASS_1 );
            ninjas.GameObjectBundleFactory.createDecoSprite( this, 220,   5005, ninjas.DecoPosition.BG, ninjas.SpriteTemplate.SPRITE_GRASS_2 );
            ninjas.GameObjectBundleFactory.createDeco(       this, 70,    5000, ninjas.DecoPosition.FG, ninjas.Image.IMAGE_TREE_1            );
            ninjas.GameObjectBundleFactory.createDecoSprite( this, 1540,  5000, ninjas.DecoPosition.FG, ninjas.SpriteTemplate.SPRITE_GRASS_1 );
            ninjas.GameObjectBundleFactory.createDecoSprite( this, 1650,  5005, ninjas.DecoPosition.BG, ninjas.SpriteTemplate.SPRITE_GRASS_2 );
            ninjas.GameObjectBundleFactory.createDeco(       this, 1950,  5010, ninjas.DecoPosition.FG, ninjas.Image.IMAGE_BUSH_2            );
            ninjas.GameObjectBundleFactory.createDeco(       this, 1860,  5000, ninjas.DecoPosition.FG, ninjas.Image.IMAGE_BUSH_1            );

            // shrine 2
            ninjas.GameObjectBundleFactory.createMovable(  this, 3680,  4800, ninjas.DecoPosition.FG, ninjas.Image.IMAGE_POT      );
            ninjas.GameObjectBundleFactory.createShrine(   this, 3770,  4800, false, true, ninjas.SiteContent.CONTENT_COMPANY     );
            ninjas.GameObjectBundleFactory.createDeco(     this, 4230,  4800, ninjas.DecoPosition.BG, ninjas.Image.IMAGE_BUSH_1   );
            ninjas.GameObjectBundleFactory.createDeco(     this, 4150,  4800, ninjas.DecoPosition.BG, ninjas.Image.IMAGE_STATUE_2 );

            // shrine 2 nature
            ninjas.GameObjectBundleFactory.createDecoSprite( this, 4430,  4800, ninjas.DecoPosition.BG, ninjas.SpriteTemplate.SPRITE_GRASS_1 );
            ninjas.GameObjectBundleFactory.createDecoSprite( this, 4600,  4810, ninjas.DecoPosition.BG, ninjas.SpriteTemplate.SPRITE_GRASS_2 );
            ninjas.GameObjectBundleFactory.createDeco(       this, 4780,  4800, ninjas.DecoPosition.BG, ninjas.Image.IMAGE_TREE_STUB );
            ninjas.GameObjectBundleFactory.createDeco(       this, 4980,  4820, ninjas.DecoPosition.FG, ninjas.Image.IMAGE_BUSH_1  );
            ninjas.GameObjectBundleFactory.createDeco(       this, 5100,  4800, ninjas.DecoPosition.FG, ninjas.Image.IMAGE_BUSH_2  );
            ninjas.GameObjectBundleFactory.createDeco(       this, 5600,  4800, ninjas.DecoPosition.BG, ninjas.Image.IMAGE_TREE_2  );
            ninjas.GameObjectBundleFactory.createDeco(       this, 5360,  4800, ninjas.DecoPosition.FG, ninjas.Image.IMAGE_FENCE_1 );

            // box by shrine 2
            ninjas.GameObjectBundleFactory.createCrate(  this, 7500,  4800, ninjas.CrateType.WOODEN );

            // shrine 3
            ninjas.GameObjectBundleFactory.createShrine(  this, 3650,  4060, true, false, ninjas.SiteContent.CONTENT_PHILOSOPHY  );
            ninjas.GameObjectBundleFactory.createDeco(    this, 3815,  4060, ninjas.DecoPosition.FG, ninjas.Image.IMAGE_CANDLE   );
            ninjas.GameObjectBundleFactory.createMovable( this, 3890,  4060, ninjas.DecoPosition.FG, ninjas.Image.IMAGE_GOBLET   );
            ninjas.GameObjectBundleFactory.createMovable( this, 3950,  4060, ninjas.DecoPosition.FG, ninjas.Image.IMAGE_FLASK_1  );
            ninjas.GameObjectBundleFactory.createDeco(    this, 4040,  4060, ninjas.DecoPosition.BG, ninjas.Image.IMAGE_STATUE_1 );
            ninjas.GameObjectBundleFactory.createDeco(    this, 4120,  4060, ninjas.DecoPosition.BG, ninjas.Image.IMAGE_BUSH_2   );

            // shrine 3 nature



            // bridge and water
            ninjas.GameObjectBundleFactory.createWaterArea( this, 6100,  4960, 6, 10 );
            ninjas.GameObjectBundleFactory.createBridge(    this, 6185,  4800 );

            // shrine 4
            ninjas.GameObjectBundleFactory.createDeco(    this, 7400,  4280, ninjas.DecoPosition.BG, ninjas.Image.IMAGE_STATUE_4 );
            ninjas.GameObjectBundleFactory.createMovable( this, 7630,  4280, ninjas.DecoPosition.FG, ninjas.Image.IMAGE_FLASK_2  );
            ninjas.GameObjectBundleFactory.createMovable( this, 7695,  4280, ninjas.DecoPosition.FG, ninjas.Image.IMAGE_FLASK_1  );
            ninjas.GameObjectBundleFactory.createShrine(  this, 7770,  4280, false, true, ninjas.SiteContent.CONTENT_SERVICES    );

            // shrine 5
            ninjas.GameObjectBundleFactory.createDeco(    this, 12685, 4200, ninjas.DecoPosition.BG, ninjas.Image.IMAGE_BUSH_1   );
            ninjas.GameObjectBundleFactory.createMovable( this, 12885, 4200, ninjas.DecoPosition.FG, ninjas.Image.IMAGE_POT      );
            ninjas.GameObjectBundleFactory.createShrine(  this, 13050, 4200, true, false, ninjas.SiteContent.CONTENT_REFERENCES  );
            ninjas.GameObjectBundleFactory.createDeco(    this, 13220, 4200, ninjas.DecoPosition.BG, ninjas.Image.IMAGE_STATUE_5 );

            // shrine 6
            ninjas.GameObjectBundleFactory.createMovable( this, 14900, 5100, ninjas.DecoPosition.FG, ninjas.Image.IMAGE_FLASK_2  );
            ninjas.GameObjectBundleFactory.createMovable( this, 15020, 5100, ninjas.DecoPosition.FG, ninjas.Image.IMAGE_GOBLET   );
            ninjas.GameObjectBundleFactory.createMovable( this, 15120, 5100, ninjas.DecoPosition.FG, ninjas.Image.IMAGE_POT      );
            ninjas.GameObjectBundleFactory.createShrine(  this, 15400, 5100, true, true, ninjas.SiteContent.CONTENT_CONTACT      );

            // shrine 6 nature
            ninjas.GameObjectBundleFactory.createDeco(   this, 15850, 5100, ninjas.DecoPosition.BG, ninjas.Image.IMAGE_TREE_2   );



            // TODO unclassified!
            ninjas.GameObjectBundleFactory.createDeco(   this, 7000,  4800, ninjas.DecoPosition.FG, ninjas.Image.IMAGE_BOULDER_1 );
            ninjas.GameObjectBundleFactory.createDeco(   this, 7150,  4800, ninjas.DecoPosition.FG, ninjas.Image.IMAGE_BOULDER_2 );
            ninjas.GameObjectBundleFactory.createDeco(   this, 7300,  4800, ninjas.DecoPosition.FG, ninjas.Image.IMAGE_BOULDER_3 );
            ninjas.GameObjectBundleFactory.createDeco(   this, 11500, 5100, ninjas.DecoPosition.FG, ninjas.Image.IMAGE_CAGE     );



            // solid grounds
            ninjas.GameObjectBundleFactory.createSolidGround( this, 0,     5000, 18, 10, ninjas.Slope.NONE,       ninjas.CapHorz.NONE  );
            ninjas.GameObjectBundleFactory.createSolidGround( this, 2304,  5000, 10, 10, ninjas.Slope.ASCENDING,  ninjas.CapHorz.NONE  );
            ninjas.GameObjectBundleFactory.createSolidGround( this, 3584,  4800, 20, 10, ninjas.Slope.NONE,       ninjas.CapHorz.RIGHT );
            ninjas.GameObjectBundleFactory.createSolidGround( this, 6844,  4800, 15, 10, ninjas.Slope.NONE,       ninjas.CapHorz.LEFT  );
            ninjas.GameObjectBundleFactory.createSolidGround( this, 8764,  4800, 15, 10, ninjas.Slope.DESCENDING, ninjas.CapHorz.NONE  );
            ninjas.GameObjectBundleFactory.createSolidGround( this, 10684, 5100, 45, 10, ninjas.Slope.NONE,       ninjas.CapHorz.NONE  );
            ninjas.GameObjectBundleFactory.createSolidGround( this, 12000, 4200, 12,  2, ninjas.Slope.NONE,       ninjas.CapHorz.BOTH  );

            // flying grounds
            ninjas.GameObjectBundleFactory.createFlyingGround( this, 5062,  4430, 3,  ninjas.Slope.NONE, ninjas.JumpPassThrough.NO, ninjas.CapHorz.BOTH );
            ninjas.GameObjectBundleFactory.createFlyingGround( this, 3525,  4060, 11, ninjas.Slope.NONE, ninjas.JumpPassThrough.NO, ninjas.CapHorz.BOTH );
            ninjas.GameObjectBundleFactory.createFlyingGround( this, 7350,  4280, 6,  ninjas.Slope.NONE, ninjas.JumpPassThrough.NO, ninjas.CapHorz.BOTH );
            ninjas.GameObjectBundleFactory.createFlyingGround( this, 9800,  4570, 3,  ninjas.Slope.NONE, ninjas.JumpPassThrough.NO, ninjas.CapHorz.BOTH );
            ninjas.GameObjectBundleFactory.createFlyingGround( this, 10800, 4370, 3,  ninjas.Slope.NONE, ninjas.JumpPassThrough.NO, ninjas.CapHorz.BOTH );
        }
    }
