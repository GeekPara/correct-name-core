import { readFileSync } from 'fs';
import pinyin from 'pinyin';

class Cornm {
    /**
     * 读入人名列表，生成一个Cornm实例
     * @param {String} file 人名列表文件，一行一个名字，UTF-8编码
     * @returns {Cornm} Cornm实例
     */
    constructor(file) {
        if (file === undefined) {
            let err = new Error('[correct-name-core] Init faild: input namelist required')
            err.code = 'NO_INPUT_FILE'
            throw err
        }
        let namelist = [];
        try {
            namelist = byLine(readFileSync(file, { encoding: 'utf8' }));
        } catch (error) {
            let err = new Error(`[correct-name-core] Init faild: can't read file "${file}"`)
            err.code = 'READ_FILE_FAILD'
            err.file = file
            throw err
        }
        var namepy = [];
        for (let i of namelist) {
            namepy.push({ Name: i, Pinyin: generatePy(i) })
        };
        this.db = namepy
    }

    /**
     * 查询一个缩写对应的所有人名
     * @param {String} pinyin 要查询的姓名首字母缩写
     * @returns {Array<String>} 符合条件的全部人名的数组
     */
    q(pinyin) {
        if (pinyin === undefined) {
            let err = new Error('[correct-name-core] Init faild: input namelist required')
            err.code = 'NO_INPUT_PINYIN'
            throw err
        }
        let a = pinyin.split('');
        let query = this.db
            .filter(item => {
                if (item.Pinyin[0].indexOf(a[0]) >= 0) return true;
                else return false;
            })
        if (a.length >= 2) {
            for (const i in a) {
                let tempArry = [];
                query.forEach(element => {
                    if (element.Pinyin.length < a.length) return false;
                    if (element.Pinyin[i].indexOf(a[i]) >= 0) tempArry.push(element);
                });
                query = tempArry;
            }
        }
        let names = [];
        query.forEach(element => {
            names.push(element.Name);
        });
        let rtn = names.sort((a, b) => {
            if (a.length < b.length) return -1;
            if (a.length > b.length) return 1;
            else return pinyin.compare(a, b);
        });
        // print(rtn)
        return rtn;
    }
}

function byLine(string) {
    let i = 0;
    let arr = [];
    while (i > -1) {
        var j = i;
        i = string.indexOf('\n', j + 1);
        var raw = string.substring(j, i == -1 ? string.length : i);
        var noReturn = raw.substring(
            raw.indexOf('\n') == -1 ? 0 : raw.indexOf('\n') + 1,
            raw.indexOf('\r') == -1 ? raw.length : raw.length - 1
        );
        if (noReturn) arr.push(noReturn);
    }
    return arr;
}

function generatePy(i) {
    let py = pinyin(i, {
        heteronym: true,
        style: pinyin.STYLE_FIRST_LETTER,
    });
    return py;
}

export default Cornm;
