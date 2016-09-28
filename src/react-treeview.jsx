import React, {PropTypes} from 'react';

class TreeView extends BaseComponent {
	/*static propTypes = {
		collapsed: PropTypes.bool,
		defaultCollapsed: PropTypes.bool,
		nodeLabel: PropTypes.node.isRequired,
		className: PropTypes.string,
		itemClassName: PropTypes.string
	};*/

	constructor(props) {
	    super(props);
	    this._bind("onArrowClick", "onClick");
		this.state = {collapsed: this.props.defaultCollapsed};
	}

	onArrowClick(...args) {
		this.setState({collapsed: !this.state.collapsed});
		if (this.props.onArrowClick) this.props.onArrowClick(...args);
	}

	onClick(...args) {
		if (this.props.onClick) this.props.onClick(...args);
	}

	render() {
		//var {collapsed = this.state.collapsed, className, itemClassName, nodeLabel, children, selected, style, ...rest} = this.props;
		var {collapsed = this.state.collapsed, className, itemClassName, titleElement, nodeLabel, children, selected, style} = this.props;

		let containerClassName = 'tree-view_children';
		if (collapsed)
			containerClassName += ' tree-view_children-collapsed';

	    var hasChildren = children && children.length;
	    var iconSize = 8; // with padding: 12
		return (
			<div className={"tree-view " + className} style={style}>
				<div onClick={this.onArrowClick}
					style={{
						display: "inline-block",
						boxSizing: "content-box", width: iconSize, height: iconSize, verticalAlign: "top", marginTop: 2, padding: 2,
						userSelect: "none", WebkitUserSelect: "none", backgroundPosition: 2, backgroundRepeat: "no-repeat", backgroundSize: 8, cursor: "pointer",
						backgroundImage: hasChildren && ("url(/Main/Packages/Images/Buttons/" + (collapsed ? "Right" : "Down") + ".png)")
					}}/>
				<div className={"tree-view_item " + itemClassName} onClick={this.onClick}
					style={{display: "inline-block", width: "calc(100% - 12px)", backgroundColor: selected ? "rgba(44, 79, 122, .5)" : null}}>
					{titleElement || nodeLabel}
				</div>
				<div className={containerClassName}>
					{collapsed ? null : children}
				</div>
			</div>
		);
	}
}

export default TreeView;