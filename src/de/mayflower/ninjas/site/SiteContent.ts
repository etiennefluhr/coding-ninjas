
    require( "animate.css" );

    import * as ninjas from '../ninjas';

    /*******************************************************************************************************************
    *   Specifies the site content for the site panels.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *******************************************************************************************************************/
    export class SiteContent
    {
        /*****************************************************************************
        *   Appends example content to the specified relative container.
        *
        *   @param relativeContainer The relative container to append the content to.
        *****************************************************************************/
        public static appendExampleContent( relativeContainer:HTMLDivElement ) : void
        {
            // example text
            let exampleText:HTMLParagraphElement = document.createElement( "p" );
            exampleText.innerHTML = "Bavaria ipsum dolor sit amet Schaung kost nix Xaver, Almrausch. Des basd scho und glei wirds no fui lustiga Hetschapfah Ramasuri aasgem Sauakraud fias Schorsch o’ha Woibbadinga. Sauakraud schaugn i vo de! So in da greana Au Watschnpladdla mim Radl foahn allerweil i mechad dee Schwoanshaxn jo mei kimmt sauba, gwiss!<br><br>Wurschtsolod jo leck mi vui und. Nix Gwiass woass ma ned Blosmusi bittschön, oans, zwoa, gsuffa hod gelbe Rüam gscheit: Mim Radl foahn Gaudi no a Maß Schmankal, Spuiratz? Wia pfiad de Zwedschgndadschi Brodzeid i Weißwiaschd gwihss hallelujah sog i, luja Auffisteign, geh aba. Do legst di nieda des is a gmahde Wiesn ned oba Ledahosn Charivari allerweil i umma greaßt eich nachad, Ohrwaschl. Boarischer ja, wo samma denn gar nia need gwiss hogg di hera a bissal da i daad is des liab. Am acht’n Tag schuf Gott des Bia Schdeckalfisch Bladl geh da.";
            exampleText.style.width  = "parent";
            exampleText.style.padding = "20px";
            exampleText.style.margin = "0";

            let exampleBlock:HTMLDivElement = document.createElement( "div" );
            exampleBlock.style.width  = "parent";
            exampleBlock.style.padding = "20px";
            exampleBlock.style.margin = "0";
            exampleBlock.style.background = "#fffc9e";

            let exampleImage:HTMLImageElement = document.createElement( "img" );
            exampleImage.src = ninjas.SettingEngine.PATH_IMAGE_SITE + "logo.png";
            exampleImage.style.width = "100%";
            exampleImage.style.height = "auto";

            exampleBlock.appendChild( exampleImage );

            // append to relative container
            relativeContainer.appendChild( exampleBlock );
            relativeContainer.appendChild( exampleText  );
        }
    }