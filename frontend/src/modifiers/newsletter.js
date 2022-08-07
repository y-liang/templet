import { load } from 'cheerio';
import { DEMAND_FIELDS, SUPPLY_FIELDS, KEYWORD_DEMAND } from '../utils/constant.js';


const populateNewsletter = async ({ type, template, fields }) => {
    // console.log('template', template); // File oject
    console.log('fields', { type, template, fields });

    const reader = new FileReader();

    reader.readAsText(template);
    let templateHtml = await (async () => {
        return new Promise((resolve, reject) => {
            reader.addEventListener('load', () => {
                // this will then display a text file
                resolve(reader.result);
            });
        });
    })();


    // console.log('templateHtml', templateHtml);
    let $tpl$ = load(templateHtml);


    let fieldNames = type == KEYWORD_DEMAND ? DEMAND_FIELDS : SUPPLY_FIELDS;

    // field - class name - pass in data
    fieldNames.forEach(name => {
        let type = name.substring(name.lastIndexOf('_') + 1);

        switch (type) {
            case 'link':
                // link could be on image and button
                $tpl$(`.${name}`).each((i, el) => {
                    const $el = $tpl$(el);
                    $el.attr('href', fields[name]);
                });
                break;
            case 'image':
                $tpl$(`.${name}`).attr('src', fields[name]);
                break;
            case 'title':
                $tpl$(`.${name}`).append(`<span>${fields[name]}</span>`);
                break;
            case 'text':
                $tpl$(`.${name}`).append(`<span>${fields[name]}</span>`);
                break;

            default:
                break;
        }


    });

    return $tpl$.html();

};

export default populateNewsletter;