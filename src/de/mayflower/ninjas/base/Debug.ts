
    import * as ninjas from '../ninjas';

    /*******************************************************************************************************************
    *   Represents a debug group whose logging can be enabled or disabled.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export class Debug
    {
        /** A global debug group. */
        public      static  bugfix          :Debug              = new Debug( ninjas.Setting.DEBUG_MODE          );
        /** Debugs the init system. */
        public      static  init            :Debug              = new Debug( ninjas.Setting.DEBUG_MODE && true  );
        /** Debugs the image system. */
        public      static  image           :Debug              = new Debug( ninjas.Setting.DEBUG_MODE && false );
        /** Debugs the sound system. */
        public      static  sound           :Debug              = new Debug( ninjas.Setting.DEBUG_MODE && false );
        /** Debugs the key system. */
        public      static  key             :Debug              = new Debug( ninjas.Setting.DEBUG_MODE && false );
        /** Debugs the pickable game items. */
        public      static  item            :Debug              = new Debug( ninjas.Setting.DEBUG_MODE && true  );
        /** Debugs enemy events. */
        public      static  enemy           :Debug              = new Debug( ninjas.Setting.DEBUG_MODE && true  );

        /** The flag that enables or disables logging for this debug group. */
        private             debugEnabled    :boolean            = false;

        /***************************************************************************************************************
        *   Constructs a new debug group.
        *
        *   @param  debugEnabled    Flags if this debug group should log messages.
        ***************************************************************************************************************/
        public constructor( debugEnabled:boolean )
        {
            this.debugEnabled = debugEnabled;
        }

        /***************************************************************************************************************
        *   Logs a line of output to the default console. Will only generate output
        *   if the debug for this debug group is enabled.
        *
        *   @param msg The message to log to the default console.
        ***************************************************************************************************************/
        public log( msg:string = "" ):void
        {
            if ( this.debugEnabled )
            {
                console.log( '[' + ninjas.String.getDateTimeString() + '] ' + msg );
            }
        }
    }