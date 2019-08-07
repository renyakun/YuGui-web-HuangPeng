import { parse } from 'url';

// reportNo: '报告编号',
// createRealName: '创建人',
// createTime: '创建时间',
// checkRealName: '审核人',
// checkTime: '审核时间',
// approveRealName: '审批人',
// approveTime: '审批时间',
// fileRealName: '归档人',
// fileTime: '归档时间',


const days = new Date();   // 程序计时的月从0开始取值后+1   
const month = days.getMonth() + 1;
const timer = "timer:" + days.getFullYear() + "-" + month + "-"
    + days.getDate() + " " + days.getHours() + ":"
    + days.getMinutes() + ":" + days.getSeconds();

console.log(timer);


// mock tableListDataSource
let tableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
    tableListDataSource.push({
        key: i,
        //disabled: i % 6 === 0,
        href: 'https://ant.design',
        avatar: [
            'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
            'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
        ][i % 2],
        reportNo: `A${i}${i + 1}${i + 2}`,
        realName: Math.floor(Math.random() * 10) % 4,
        status: Math.floor(Math.random() * 10) % 4,
        //updatedAt: new Date(`2019-08-${Math.floor(i / 2) + 1}`),
        updatedAt: timer,

        name: `TradeCode ${i}`,
        title: `一个任务名称 ${i}`,
        owner: '曲丽丽',
        desc: '这是一段描述',
        callNo: Math.floor(Math.random() * 1000),
        createdAt: new Date(`2019-07-${Math.floor(i / 2) + 1}`),
        progress: Math.ceil(Math.random() * 100),
    });
}

function getRule(req, res, u) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }

    const params = parse(url, true).query;

    let dataSource = tableListDataSource;

    if (params.sorter) {
        const s = params.sorter.split('_');
        dataSource = dataSource.sort((prev, next) => {
            if (s[1] === 'descend') {
                return next[s[0]] - prev[s[0]];
            }
            return prev[s[0]] - next[s[0]];
        });
    }
    if (params.realName) {
        const realName = params.realName.split(',');
        let filterDataSource = [];
        realName.forEach(s => {
            filterDataSource = filterDataSource.concat(
                dataSource.filter(data => parseInt(data.realName, 10) === parseInt(s[0], 10))
            );
        });
        dataSource = filterDataSource;
    }

    if (params.reportNo) {
        dataSource = dataSource.filter(data => data.reportNo.indexOf(params.reportNo) > -1);
    }

    if (params.status) {
        const status = params.status.split(',');
        let filterDataSource = [];
        status.forEach(s => {
            filterDataSource = filterDataSource.concat(
                dataSource.filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
            );
        });
        dataSource = filterDataSource;
    }

    if (params.name) {
        dataSource = dataSource.filter(data => data.name.indexOf(params.name) > -1);
    }

    let pageSize = 10;
    if (params.pageSize) {
        pageSize = params.pageSize * 1;
    }

    const result = {
        list: dataSource,
        pagination: {
            total: dataSource.length,
            pageSize,
            current: parseInt(params.currentPage, 10) || 1,
        },
    };

    return res.json(result);
}

export default {
    'GET /api/rules': getRule,
};
