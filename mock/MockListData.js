export default {
    'get/tk/task': (req, res) => {//模拟请求返回数据
        res.json({
            checkNum: 5,
            proveNum: 10
        })
    },
    'get/report/detail': (req, res) => {//模拟请求返回数据
        res.json([
            {
                checkExplain: "外观检查，解体，清洗",
                checkMedium: "氩气",
                checkMode: "检验台",
                checkResult: "合格",
                companyAddress: "上海市,上海市,闵行区,莘松路958弄",
                companyContacts: "韦家聪",
                companyUse: "上海康城",
                deviceNo: "11011206",
                installLocation: "双效浓缩IV蒸汽管道",
                remarks: "无",
                reportNo: "A23423",
                requireSettingPressure: "0.15",
                sealTestPressure: "0.15",
                settingPressure: "0.15",
                standard: "安全阀安全技术监察规程",
                telephone: "13082223442",
                valveModel: "A4K8-16C",
                valveType: "弹簧式",
                workMedium: "蒸汽",
                workPressure: "0.15"
            }
        ])
    }
}