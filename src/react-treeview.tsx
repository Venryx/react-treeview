import {PropTypes} from "react";
import {BaseComponent} from "../Frame/General/ReactGlobals";
import {E} from "../Frame/General/Globals";

class TreeView extends BaseComponent<any, {collapsed}> {
	/*static propTypes = {
		collapsed: PropTypes.bool,
		defaultCollapsed: PropTypes.bool,
		nodeLabel: PropTypes.node.isRequired,
		className: PropTypes.string,
		itemClassName: PropTypes.string
	};*/

	constructor(props) {
	    super(props);
		var {defaultCollapsed} = this.props;
		this.state = {collapsed: defaultCollapsed};
	}

	onArrowClick(...args) {
		var {collapsible, onArrowClick} = this.props;
		var {collapsed} = this.state;
	    var newCollapsed = collapsed;
	    if (collapsible) {
	        newCollapsed = !collapsed;
	        this.setState({collapsed: newCollapsed});
	    }
	    onArrowClick && onArrowClick(newCollapsed);
	}

	onClick(...args) {
		var {onClick} = this.props;
		onClick && onClick(...args);
	}

	render() {
		var {collapsible, className, itemClassName, titleElement, nodeLabel, children, selected, style, titleStyle} = this.props;
		var {collapsed} = this.state;

		let containerClassName = "tree-view_children";
		if (collapsed)
			containerClassName += " tree-view_children-collapsed";

	    var iconSize = 8; // with padding: 12
		return (
			<div className={"tree-view " + className} style={style}>
				<div onClick={this.onArrowClick}
					style={E(
						{
							display: "inline-block",
							boxSizing: "content-box", width: iconSize, height: iconSize, verticalAlign: "top", marginTop: 2, padding: 2,
							userSelect: "none", WebkitUserSelect: "none", backgroundPosition: 2, backgroundRepeat: "no-repeat", backgroundSize: 8, cursor: "pointer",
						},
						collapsible && {backgroundImage: "url(/Main/Packages/Images/Buttons/" + (collapsed ? "Right" : "Down") + ".png)"},
						!collapsible && {opacity: 0},
					)}/>
				<div className={"tree-view_item " + itemClassName} onClick={this.onClick}
					style={E(
						titleStyle,
						{display: "inline-block", width: "calc(100% - 12px)",
							backgroundColor: selected ? "rgba(44, 79, 122, .5)" : null}
					)}>
					{titleElement || nodeLabel}
				</div>
				<div className={containerClassName} style={E(collapsed && {display: "none"})}>
					{/*collapsed ? null : children*/}
					{children}
				</div>
			</div>
		);
	}
}

export default TreeView;