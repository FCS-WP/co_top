import { __ } from "@wordpress/i18n";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { Button, PanelBody, TextControl } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps({ className: "ctpf" });
	const items = Array.isArray(attributes.items) ? attributes.items : [];

	const updateItem = (index, key, value) => {
		const next = [...items];
		next[index] = { ...(next[index] || {}), [key]: value };
		setAttributes({ items: next });
	};

	const addItem = () => {
		setAttributes({
			items: [...items, { label: "", target: "" }],
		});
	};

	const removeItem = (index) => {
		setAttributes({ items: items.filter((_, i) => i !== index) });
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Filter Items", "ai-zippy")} initialOpen>
					{items.map((item, index) => (
						<div key={index}>
							<TextControl
								label={__("Label", "ai-zippy")}
								value={item.label || ""}
								onChange={(value) => updateItem(index, "label", value)}
							/>
							<TextControl
								label={__("Target Key", "ai-zippy")}
								value={item.target || ""}
								onChange={(value) => updateItem(index, "target", value)}
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
				{items.map((item, index) => (
					<button className={`ctpf__btn ${index === 0 ? "is-active" : ""}`} key={item.target || index}>
						{item.label}
					</button>
				))}
			</div>
		</>
	);
}
