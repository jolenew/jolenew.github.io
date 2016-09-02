/**
 * Created by 毅 on 2016/7/13.
 */

/*
* 根据指定id获取下面的一级子数据
* */
function getChildren(id) {
    var arr = [];
    for (var i=0; i<datas.length; i++) {
        if ( datas[i].pid == id ) {
            arr.push( datas[i] );
        }
    }
    return arr;
}

/*
* 找所有子级
* */
function getAllChildren(id, level) {
    var arr = [];
    var level = level || 0;
    var children = getChildren(id);
    for (var i=0; i<children.length; i++) {
        children[i].level = level;
        arr.push( children[i] );
        arr = arr.concat( getAllChildren(children[i].id, level+1) );
    }
    return arr;
}

/*
* 获取数据中最大的id
* */
function getMaxId() {
    var maxId = 0;
    for (var i=0; i<datas.length; i++) {
        if ( datas[i].id > maxId ) {
            maxId = datas[i].id;
        }
    }
    return maxId;
}

/*
* 根据id获取信息
* */
function getInfo(id) {
    for (var i=0; i<datas.length; i++) {
        if (datas[i].id == id) {
            return datas[i];
        }
    }
}

/*
* 获取父级
* */
function getParent(id) {
    var info = getInfo(id);
    if (info) {
        return getInfo(info.pid);
    }
}

/*
* 获取所有父级
* */
function getParents(id) {
    var arr = [];
    var parent = getParent(id);
    if (parent) {
        arr.push(parent);
        arr = arr.concat( getParents(parent.id) );
    }
    return arr;
}