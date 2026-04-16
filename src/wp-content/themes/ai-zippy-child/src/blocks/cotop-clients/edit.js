import { __ } from "@wordpress/i18n";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { Button, PanelBody, TextControl, TextareaControl } from "@wordpress/components";
import { useEffect } from "@wordpress/element";

export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps({ className: "ctcli" });
	const fallbackItems = (attributes.itemsText || "").split(/\r\n|\r|\n/).map((item) => item.trim()).filter(Boolean);
	const items = Array.isArray(attributes.items) && attributes.items.length > 0
		? attributes.items
		: fallbackItems;

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
				<PanelBody title={__("Content", "ai-zippy")} initialOpen>
					<TextControl label={__("Label", "ai-zippy")} value={attributes.label} onChange={(label) => setAttributes({ label })} />
					<TextControl label={__("Title", "ai-zippy")} value={attributes.title} onChange={(title) => setAttributes({ title })} />
					<TextareaControl label={__("Body", "ai-zippy")} value={attributes.body} onChange={(body) => setAttributes({ body })} />
					{items.map((item, index) => (
						<div key={index}>
							<TextControl
								label={__("Client Item", "ai-zippy") + ` ${index + 1}`}
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
			<section {...blockProps}>
				<div className="ctcli__label">{attributes.label}</div>
				<h2 className="ctcli__title">{attributes.title}</h2>
				<p className="ctcli__body">{attributes.body}</p>
				<div className="ctcli__logos">
					{items.map((item, index) => (
						<span className="ctcli__logo" key={index}>{item}</span>
					))}
				</div>
			</section>
		</>
	);
}
