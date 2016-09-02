/**
 * Created by 毅 on 2016/7/13.
 */

window.onload = function() {

    var contentElement = document.getElementById('content');
    var checkAll = document.getElementById('checkAll');
    var toolsBtn = document.querySelectorAll('#tools button');
    var breadcrumb = document.querySelector('#breadcrumb');
    var breadcrumbList = document.querySelector('#breadcrumb .list');
    
    var box = document.getElementById('box');
    var mark = document.getElementById('mark');

    var elements = [];

    var currentPid = 0;

	var namNum = 0;
    /*
    * 根据数据列表生成视图
    * */
    //for (var i=0; i<datas.length; i++) {
    //    if (datas[i].pid == 0) {
    //        createFile(datas[i]);
    //    }
    //}

    render( getChildren( currentPid ) );
    showBreadcrumb();

    /*
    * 新建文件夹
    * */
    toolsBtn[0].onclick = function() {
    	
    	msg();
    	
//      var name = prompt('请输入文件夹的名称');
        datas.push({
            id: getMaxId() + 1,
            pid: currentPid,
            name: name || '新建文件夹',
            type: 'folder'
        });
        render( getChildren(currentPid) );
    }
	//移动到
    toolsBtn[2].onclick = function() {
        var info = getInfo(1);
        info.pid = 4;
        render( getChildren(currentPid) );
        showBreadcrumb();
    }

    breadcrumb.onclick = function(e) {
        if (e.target.tagName.toLowerCase() == 'a') {
            currentPid = e.target.getAttribute('fileId');
            render( getChildren(currentPid) );
            showBreadcrumb();
        }
    }

    //console.dir( getInfo(4) )

    //console.dir( getParent(9) )

    //console.dir( getParents(9) )

    var childrenAll = getAllChildren(0);

    for (var i=0; i<childrenAll.length; i++) {

        var s = '';
        for (var j=0; j<childrenAll[i].level; j++) {
            s += '  ';
        }

        console.log( s + childrenAll[i].name )
    }

    /*
    * 全选
    * */
    checkAll.onclick = function() {
        //根据当前checkAll的状态去批量设置元素的class
        for (var i=0; i<elements.length; i++) {
            setStatus(elements[i], this.checked);
        }
    }

    /*
    * 根据指定数据创建文件视图
    * @param data [object] 传入的数据
    * @return undefined
    * */
    function createFile(data) {
        var div = document.createElement('div');
        div.fileId = data.id;
        div.className = 'file';

        var checkbox = document.createElement('span');
        checkbox.className = 'checkbox';
        div.appendChild(checkbox);

        var image = document.createElement('div');
        image.className = 'image image-' + data.type;
        div.appendChild(image);

        var name = document.createElement('div');
        name.className = 'name';
        name.innerHTML = data.name;
        div.appendChild(name);

        /*
        * 事件处理
        * */
        div.onmouseover = function() {
            if (this.checked) {
                //当前是选中，那么保持选中状态
                div.className = 'file file-checked';
            } else {
                //当前是未选中，则回到移入状态
                div.className = 'file file-hover';
            }
        }
        div.onmouseout = function() {
            if (this.checked) {
                //当前是选中，那么保持选中状态
                div.className = 'file file-checked';
            } else {
                //当前是未选中，则回到初始状态
                div.className = 'file';
            }
        }
        checkbox.onclick = function(e) {
            //多此一举
            //if ( div.checked ) {
            //    setStatus(div, false);
            //} else {
            //    setStatus(div, true);
            //}
            setStatus(div, !div.checked);
            //判断是否全选
            checkAll.checked = getChecked().length == elements.length;
            e.cancelBubble = true;
        }

        div.onclick = function() {
            //alert(this.fileId)
            currentPid = this.fileId;
            render( getChildren(this.fileId) );
            showBreadcrumb();
        }

        contentElement.appendChild(div);
        elements.push(div);
    }

    /*
    * 设置某个文件为状态
    * @param fileElement [element object] 要设置状态的元素
    * @param status [boolean] 要设置的状态，true表示选中，false表示未选中
    * @param classname [string] 设置未选中的时候的class，默认为file
    * @return undefined
    * */
    function setStatus(fileElement, status, classname) {
        var classname = classname || 'file';
        fileElement.checked = status;
        fileElement.className = status ? 'file file-checked' : classname;
    }

    /*
    * 获取选中的元素
    * */
    function getChecked() {
        var arr = [];
        for (var i=0; i<elements.length; i++) {
            if (elements[i].checked) {
                arr.push(elements[i]);
            }
        }
        return arr;
    }

    function render(renderData) {
        contentElement.innerHTML = '';
        elements = [];
        for (var i=0; i<renderData.length; i++) {
            createFile(renderData[i]);
        }
    }

    function showBreadcrumb() {
        var parentList = getParents(currentPid);
        if ( getInfo(currentPid) ) {
            parentList.unshift( getInfo(currentPid) );
        }
        var html = '';
        for (var i=parentList.length-1; i>=0; i--) {
            html += ' > <a fileId="'+ parentList[i].id +'" href="javascript:;">'+ parentList[i].name +'</a>';
        }
        breadcrumbList.innerHTML = html;
    }
	function msg() {
		var l = (document.documentElement.clientWidth - box.getBoundingClientRect().width) / 2
		var t = window.pageYOffset + (document.documentElement.clientHeight - box.getBoundingClientRect().height) / 2
		mark.style.display = 'block';
		mark.style.height = document.body.offsetHeight + 'px';
		box.style.cssText = 'left:'+l+'px;top:'+t+'px;';
	}
	
}