let paramObject = {};// 写ajax调用获取值，作为全局变量

export default {
    paramObject,
    // 获取工厂
    getFactory(paramObject) {
        if (paramObject && paramObject.factoryList) {
            return paramObject.factoryList;
        }
        return [];
    },

    // 获取部门
    getDepartment(factory,paramObject) {
        if (!factory) return [];
        if (paramObject && paramObject.departmentMap) {
            var departmentMap = paramObject.departmentMap;
            for (var key in departmentMap) {
                if (factory == key) return departmentMap[key];
            }
        }
        return [];
    },

    // 获取车间
    getWorkshopMap(factory, department, paramObject) {
        if (!factory || !department) return [];
        if (paramObject && paramObject.workshopMap) {
            var workshopMap = paramObject.workshopMap;
            for (var key in workshopMap) {
                if ((factory + '#' + department) == key) return workshopMap[key];
            }
        }
        return [];
    },

    // 获取项目
    getProjectName(factory, paramObject) {
        if (!factory) return [];
        if (paramObject && paramObject.projectNameMap) {
            var projectNameMap = paramObject.projectNameMap;
            for (var key in projectNameMap) {
                if (factory == key) return projectNameMap[key];
            }
        }
        return [];
    },

    // 获取夹次
    getProcessType(factory, paramObject) {
        if (!factory) return [];
        if (paramObject && paramObject.processTypeMap) {
            var processTypeMap = paramObject.processTypeMap;
            for (var key in processTypeMap) {
                if (factory == key) return processTypeMap[key];
            }
        }
        return [];
    }
}