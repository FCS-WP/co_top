import { __ } from "@wordpress/i18n";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { Button, PanelBody, TextControl, TextareaControl } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps({ className: "ctadv" });
	const items = Array.isArray(attributes.items) ? attributes.items : [];

	const updateItem = (index, key, value) => {
		const next = [...items];
		next[index] = { ...(next[index] || {}), [key]: value };
		setAttributes({ items: next });
	};

	const addItem = () => {
		setAttributes({ items: [...items, { number: "", title: "", body: "" }] });
	};

	const removeItem = (index) => {
		setAttributes({ items: items.filter((_, i) => i !== index) });
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Section Content", "ai-zippy")} initialOpen>
					<TextControl label={__("Label", "ai-zippy")} value={attributes.label} onChange={(label) => setAttributes({ label })} />
					<TextControl label={__("Title", "ai-zippy")} value={attributes.title} onChange={(title) => setAttributes({ title })} />
				</PanelBody>
				<PanelBody title={__("Advantage Items", "ai-zippy")} initialOpen={false}>
					{items.map((item, index) => (
						<div key={index}>
							<TextControl label={__("Number", "ai-zippy")} value={item.number || ""} onChange={(value) => updateItem(index, "number", value)} />
							<TextControl label={__("Title", "ai-zippy")} value={item.title || ""} onChange={(value) => updateItem(index, "title", value)} />
							<TextareaControl label={__("Body", "ai-zippy")} value={item.body || ""} onChange={(value) => updateItem(index, "body", value)} />
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
				<div className="ctadv__label">{attributes.label}</div>
				<h2 className="ctadv__title">{attributes.title}</h2>
				<div className="ctadv__grid">
					{items.map((item, index) => (
						<div className="ctadv__item" key={index}>
							<span className="ctadv__num">{item.number}</span>
							<div className="ctadv__item-title">{item.title}</div>
							<p className="ctadv__body">{item.body}</p>
						</div>
					))}
				</div>
			</section>
		</>
	);
}
