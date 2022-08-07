import { load } from 'cheerio';

/**
 * structure spreadsheet and arrange columns to only, csv to json array on https://www.convertcsv.com/csv-to-json.htm
 * 
 * Property Type | Property Address City | Property Size | Starting Bid Amount | Property UTM
 * 
 * update cta link, header image, countdown clock & table content
 * 
 * .cta-link .header-image .countdown-clock .table-contents
 * 
 * 
 * 
 * template file .html
 * information file .json
 * 
 */


const populateAuction = async ({ template, information, link, image, clock }) => {

    const templateReader = new FileReader();
    const informationReader = new FileReader();

    // read as strings
    templateReader.readAsText(template);
    informationReader.readAsText(information);

    const templatePromise = new Promise((resolve, reject) => {
        templateReader.addEventListener('load', () => {
            resolve(templateReader.result); // this will then display a text file
        });
    });

    const informationPromise = new Promise((resolve, reject) => {
        informationReader.addEventListener('load', () => {
            resolve(informationReader.result);
        });
    });

    const [templateHtml, informationJson] = await Promise.all([templatePromise, informationPromise]);

    const tableContent = arrayToTable(informationJson); // pass in json string

    // pass in fields
    let $tpl$ = load(templateHtml);


    // add values for cta link, header image, countdown clock
    $tpl$('.cta-link').attr('href', link);
    $tpl$('.header-image').attr('src', image);
    $tpl$('.countdown-clock').attr('src', clock);


    // add table content
    $tpl$('.table-content').append(tableContent);


    // // output
    // fs.writeFileSync('../../../unloads' + KEYWORD_AUCTION, $tpl$.html());
    return $tpl$.html();
};





const priceFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});

const arrayToTable = (jsonArrayString) => (
    '' + JSON.parse(jsonArrayString).map(unit => `
        <tr class="data-row" data-name="${unit[1]}"
        style="color: #808080; font-size: 14px; font-family: Avenir, Helvetica, Arial, sans-serif;">
        <td align="center" style="border-right: 1px solid #D3D3D3">&nbsp;&nbsp;&nbsp;&nbsp; <a href="
        ${unit[4]}
        " style="color: #2E8DDD;"><span style="color: #2E8DDD;display: block;"> ${unit[0]}
            </span> </a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </td>
        <td align="center" style="border-right: 1px solid #D3D3D3">&nbsp;&nbsp;&nbsp;&nbsp; <span>
            ${unit[1]}
        </span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </td>
        <td align="center" style="border-right: 1px solid #D3D3D3">&nbsp;&nbsp;&nbsp;&nbsp; <span>  ${unit[2]}
        </span> &nbsp;&nbsp;&nbsp;&nbsp;</td>
        <td align="center">&nbsp;&nbsp;&nbsp;&nbsp; <span> ${priceFormat.format(unit[3])} </span> &nbsp;&nbsp;&nbsp;&nbsp;</td>
        </tr >
            <tr>
                <td class="data-spacer" style="border-right: 1px solid #D3D3D3">&nbsp;&nbsp;&nbsp;&nbsp;</td>
                <td class="data-spacer" style="border-right: 1px solid #D3D3D3">&nbsp;&nbsp;&nbsp;&nbsp;</td>
                <td class="data-spacer" style="border-right: 1px solid #D3D3D3">&nbsp;&nbsp;&nbsp;&nbsp;</td>
            </tr>
        `).join('')
);



export default populateAuction;