import React, {PropTypes} from 'react';

class TreeView extends BaseComponent {
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
		const {
			collapsed = this.state.collapsed,
			//className = '',
			itemClassName = '',
			nodeLabel,
			children,
			//...rest,
		} = this.props;

		//let arrowClassName = 'tree-view_arrow';
		let containerClassName = 'tree-view_children';
		if (collapsed) {
			//arrowClassName += ' tree-view_arrow-collapsed';
			containerClassName += ' tree-view_children-collapsed';
		}

		return (
			<div className="tree-view">
				<div onClick={this.onArrowClick}
					style={{
						cursor: "pointer", display: "inline-block", width: 8, height: 8, verticalAlign: "top", marginTop: 2, padding: 2,
						userSelect: "none", WebkitUserSelect: "none", backgroundPosition: 2, backgroundRepeat: "no-repeat", backgroundSize: 8,
						backgroundImage: children.length ? ("url(/Main/Packages/Images/Buttons/" + (collapsed ? "Right" : "Down") + ".png)") : ""
					}}/>
				<div className={"tree-view_item " + itemClassName} onClick={this.onClick}
					style={{display: "inline-block", backgroundColor: this.props.selected ? "rgba(44, 79, 122, .5)" : null}}>
					{nodeLabel}
				</div>
				<div className={containerClassName}>
					{collapsed ? null : children}
				</div>
			</div>
		);
	}
}
TreeView.propTypes = {
	collapsed: PropTypes.bool,
	defaultCollapsed: PropTypes.bool,
	nodeLabel: PropTypes.node.isRequired,
	className: PropTypes.string,
	itemClassName: PropTypes.string,
};

export default TreeView;