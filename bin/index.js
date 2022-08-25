#!/usr/bin/env node
// @ts-check

import { XMLParser } from 'fast-xml-parser';
import meow from 'meow';
import fs from 'fs';
import Conf from 'conf';
import chalk from 'chalk';
import { templateLitTS } from './templates/index.js';

/**
 * 
 * @param {Record<string, (string | number | boolean)>} rawAttributes 
 * @returns 
 */
const parseAttributes = (rawAttributes) => {
    return Object.entries(rawAttributes).map(([k, v]) => {
        const name = k.substring(2);
        const isEvent = name.startsWith('@');
        return {
            name: isEvent ? name.substring(1) : name,
            value: v,
            isEvent
        }
    })
}

/**
 * 
 * @param {string} lib 
 * @returns 
 */
const getTemplate = (lib) => {
    const templates = {
        'lit.ts': templateLitTS,
    }

    if (!(lib in templates)) {
        throw new Error(`${chalk.cyan('create-wc:')} unknown template "${lib}". Available templates: ${templates.keys().toString()}`);
    }

    return templates[lib];
}

/**
 * 
 * @param {any} parsedXML 
 * @param {string} lib 
 */
const writeFile = (parsedXML, lib) => {
    const attrEntries = Object.entries(parsedXML);
    const tagName = attrEntries[0][0].toLowerCase();
    const fileType = lib.split('.')[1];
    const path = `${tagName}.${fileType}`;
    const content = getTemplate(lib)(tagName, parseAttributes(attrEntries[0][1]));
    try {
        fs.writeFileSync(path, content);
        console.log(`${chalk.cyan('create-wc:')} generated web component ${chalk.green(path)} 🐣\n`);
    } catch (err) {
        console.error(err);
    }
}

(function init() {
    const conf = new Conf({
        defaults: {
            'lib': 'lit.ts'
        },
        projectName: 'create-wc',
        projectVersion: '0.0.1'
    });

    const cli = meow(`
        ${chalk.underline('Usage')}
        $ npm init wc <input>
        $ npx create-wc <input>
        $ create-wc <input>

        ${chalk.underline('Examples')}
        $ create-wc '<my-component name="Will" age="25">'
        $ create-wc '<hello-world.js @click .isCool=false>'

        ${chalk.underline('Source')}
        https://github.com/willmartian/create-wc
        
    `, {
        importMeta: import.meta,
        flags: {
            lib: {
                type: 'string',
                default: conf.get('lib')
            }
        }
    });

    conf.set('lib', cli.flags.lib);
    const lib = cli.flags.lib;
    
    const parser = new XMLParser({
        ignoreAttributes: false,
        allowBooleanAttributes: true,
        parseAttributeValue: true
    });

    const input = cli.input.length > 0 ? cli.input : ['<hello-world isCool>'];
    console.log(''); // linebreak
    input.forEach(arg => {
        writeFile(parser.parse(arg), lib);
    });    
})();
