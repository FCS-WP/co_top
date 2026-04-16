import { __ } from "@wordpress/i18n";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { Button, PanelBody, TextControl, TextareaControl } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps({ className: "ctsvc" });
	const items = Array.isArray(attributes.items) ? attributes.items : [];

	const updateItem = (index, key, value) => {
		const next = [...items];
		next[index] = { ...(next[index] || {}), [key]: value };
		setAttributes({ items: next });
	};

	const addItem = () => {
		setAttributes({
			items: [...items, { tag: "", title: "", body: "" }],
		});
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
				</PanelBody>
				<PanelBody title={__("Service Steps", "ai-zippy")} initialOpen={false}>
					{items.map((item, index) => (
						<div key={index}>
							<TextControl label={__("Tag", "ai-zippy")} value={item.tag || ""} onChange={(value) => updateItem(index, "tag", value)} />
							<TextControl label={__("Title", "ai-zippy")} value={item.title || ""} onChange={(value) => updateItem(index, "title", value)} />
							<TextareaControl label={__("Body", "ai-zippy")} value={item.body || ""} onChange={(value) => updateItem(index, "body", value)} />
							<Button isLink isDestructive onClick={() => removeItem(index)}>
								{__("Remove Step", "ai-zippy")}
							</Button>
						</div>
					))}
					<Button isSecondary onClick={addItem}>
						{__("Add Step", "ai-zippy")}
					</Button>
				</PanelBody>
			</InspectorControls>
			<section {...blockProps}>
				<div className="ctsvc__label">{attributes.label}</div>
				<h2 className="ctsvc__title">{attributes.title}</h2>
				<p className="ctsvc__intro">{attributes.body}</p>
				<div className="ctsvc__grid">{items.map((item, index) => <div className="ctsvc__box" key={index}><div className="ctsvc__tag">{item.tag}</div><h4>{item.title}</h4><p>{item.body}</p></div>)}</div>
			</section>
		</>
	);
}
