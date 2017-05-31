import { Component, OnInit } from '@angular/core';

declare var $;
declare var Sweetalert;

@Component({
	selector: 'app-app-tree',
	templateUrl: './app-tree.component.html',
	styleUrls: ['./app-tree.component.css']
})
export class AppTreeComponent implements OnInit {

	setting1 = {
		data: {
			simpleData: {
				enable: true
			}
		}
	};
	zNodes1 = [
		{ id: 1, pId: 0, name: "父节点1 - 展开", open: true },
		{ id: 11, pId: 1, name: "父节点11 - 折叠" },
		{ id: 111, pId: 11, name: "叶子节点111" },
		{ id: 112, pId: 11, name: "叶子节点112" },
		{ id: 113, pId: 11, name: "叶子节点113" },
		{ id: 114, pId: 11, name: "叶子节点114" },
		{ id: 12, pId: 1, name: "父节点12 - 折叠" },
		{ id: 121, pId: 12, name: "叶子节点121" },
		{ id: 122, pId: 12, name: "叶子节点122" },
		{ id: 123, pId: 12, name: "叶子节点123" },
		{ id: 124, pId: 12, name: "叶子节点124" },
		{ id: 13, pId: 1, name: "父节点13 - 没有子节点", isParent: true },
		{ id: 2, pId: 0, name: "父节点2 - 折叠" },
		{ id: 21, pId: 2, name: "父节点21 - 展开", open: true },
		{ id: 211, pId: 1, name: "叶子节点211" },
		{ id: 212, pId: 21, name: "叶子节点212" },
		{ id: 213, pId: 21, name: "叶子节点213" },
		{ id: 214, pId: 21, name: "叶子节点214" },
		{ id: 22, pId: 2, name: "父节点22 - 折叠" },
		{ id: 221, pId: 22, name: "叶子节点221" },
		{ id: 222, pId: 22, name: "叶子节点222" },
		{ id: 223, pId: 22, name: "叶子节点223" },
		{ id: 224, pId: 22, name: "叶子节点224" },
		{ id: 23, pId: 2, name: "父节点23 - 折叠" },
		{ id: 231, pId: 23, name: "叶子节点231" },
		{ id: 232, pId: 23, name: "叶子节点232" },
		{ id: 233, pId: 23, name: "叶子节点233" },
		{ id: 234, pId: 23, name: "叶子节点234" },
		{ id: 3, pId: 0, name: "父节点3 - 没有子节点", isParent: true }
	];

	setting2 = {
		check: {
			enable: true,
			chkDisabledInherit: true
		},
		data: {
			simpleData: {
				enable: true
			}
		}
	};
	zNodes2 = [
		{ id: 1, pId: 0, name: "随意勾选 1", open: true },
		{ id: 11, pId: 1, name: "随意勾选 1-1", open: true },
		{ id: 111, pId: 11, name: "disabled 1-1-1", chkDisabled: true },
		{ id: 112, pId: 11, name: "随意勾选 1-1-2" },
		{ id: 12, pId: 1, name: "disabled 1-2", chkDisabled: true, checked: true, open: true },
		{ id: 121, pId: 12, name: "disabled 1-2-1", checked: true },
		{ id: 122, pId: 12, name: "disabled 1-2-2" },
		{ id: 2, pId: 0, name: "随意勾选 2", checked: true, open: true },
		{ id: 21, pId: 2, name: "随意勾选 2-1" },
		{ id: 22, pId: 2, name: "随意勾选 2-2", open: true },
		{ id: 221, pId: 22, name: "随意勾选 2-2-1", checked: true },
		{ id: 222, pId: 22, name: "随意勾选 2-2-2" },
		{ id: 23, pId: 2, name: "随意勾选 2-3" }
	];

	disabledNode(e) {
		let zTree = $.fn.zTree.getZTreeObj("treeDemo2"),
			disabled = e.data.disabled,
			nodes = zTree.getSelectedNodes(),
			inheritParent = false, inheritChildren = false;
		if (nodes.length == 0) {
			Sweetalert.notice("请先选择一个节点");
		}
		if (disabled) {
			inheritParent = $("#py").attr("checked");
			inheritChildren = $("#sy").attr("checked");
		} else {
			inheritParent = $("#pn").attr("checked");
			inheritChildren = $("#sn").attr("checked");
		}
		for (let i = 0, l = nodes.length; i < l; i++) {
			zTree.setChkDisabled(nodes[i], disabled, inheritParent, inheritChildren);
		}
	}

	constructor() { }

	ngOnInit() {
		this.initTreeDemo1();
		this.initTreeDemo2();
	}

	initTreeDemo1() {
		$.fn.zTree.init($("#treeDemo1"), this.setting1, this.zNodes1);
	}

	initTreeDemo2() {
		$.fn.zTree.init($("#treeDemo2"), this.setting2, this.zNodes2);
		$("#disabledTrue").bind("click", { disabled: true }, this.disabledNode);
		$("#disabledFalse").bind("click", { disabled: false }, this.disabledNode);
	}

	toggleToDisabled() {
		return false;
	}

	toggleToabled() {
		return true;
	}

}
