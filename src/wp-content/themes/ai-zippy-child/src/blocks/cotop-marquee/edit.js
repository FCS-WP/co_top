import { __ } from "@wordpress/i18n";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { Button, PanelBody, TextControl } from "@wordpress/components";
import { Fragment, useEffect } from "@wordpress/element";

export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps({ className: "ctm" });
	const fallbackItems = (attributes.itemsText || "").split(/\r\n|\r|\n/).map((item) => item.trim()).filter(Boolean);
	const items = Array.isArray(attributes.items) && attributes.items.length > 0
		? attributes.items
		: fallbackItems;
	const loopItems = [...items, ...items];

	useEffect(() => {
		if ((!Array.isArray(attributes.items) || attributes.items.length === 0) && fallbackItems.length > 0) {
			setAttributes({ items: fallbackItems });
		}
	}, [attributes.items, fallbackItems, setAttributes]);

	const updateItem = (index, value) => {
		const next = [...items];
		next[index] = value;
		setAttributes({ items: next });
	};

	const addItem = () => {
		setAttributes({ items: [...items, ""] });
	};

	const removeItem = (index) => {
		setAttributes({ items: items.filter((_, i) => i !== index) });
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Marquee Items", "ai-zippy")} initialOpen>
					{items.map((item, index) => (
						<div key={index}>
							<TextControl
								label={__("Item", "ai-zippy") + ` ${index + 1}`}
								value={item}
								onChange={(value) => updateItem(index, value)}
							/>
							<Button isLink isDestructive onClick={() => removeItem(index)}>
								{__("Remove Item", "ai-zippy")}
							</Button>
						</div>
					))}
					<Button isSecondary onClick={addItem}>
						{__("Add Item", "ai-zippy")}
					</Button>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<div className="ctm__track">
					{loopItems.map((item, index) => (
						<Fragment key={index}>
							<span className="ctm__item">{item}</span>
							<span className="ctm__dot">✦</span>
						</Fragment>
					))}
				</div>
			</div>
		</>
	);
}
