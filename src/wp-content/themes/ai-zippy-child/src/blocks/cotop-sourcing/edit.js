import { __ } from "@wordpress/i18n";
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	useBlockProps,
} from "@wordpress/block-editor";
import { Button, PanelBody, TextControl, TextareaControl } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps({ className: "ctsrc" });
	const titleLines = attributes.title.split(/\r\n|\r|\n/);
	const items = Array.isArray(attributes.items) ? attributes.items : [];
	const hasImage = Boolean(attributes.imageUrl);

	const updateItem = (index, key, value) => {
		const next = [...items];
		next[index] = { ...(next[index] || {}), [key]: value };
		setAttributes({ items: next });
	};

	const addItem = () => {
		setAttributes({
			items: [...items, { number: "", title: "", body: "" }],
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
					<TextareaControl label={__("Title", "ai-zippy")} value={attributes.title} onChange={(title) => setAttributes({ title })} />
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) => setAttributes({ imageId: media?.id || 0, imageUrl: media?.url || "" })}
							allowedTypes={["image"]}
							value={attributes.imageId}
							render={({ open }) => (
								<Button isSecondary onClick={open}>
									{hasImage ? __("Replace Image", "ai-zippy") : __("Select Image", "ai-zippy")}
								</Button>
							)}
						/>
					</MediaUploadCheck>
					{hasImage && (
						<Button isLink isDestructive onClick={() => setAttributes({ imageId: 0, imageUrl: "" })}>
							{__("Remove Image", "ai-zippy")}
						</Button>
					)}
				</PanelBody>
				<PanelBody title={__("Points", "ai-zippy")} initialOpen={false}>
					{items.map((item, index) => (
						<div key={index}>
							<TextControl label={__("Number", "ai-zippy")} value={item.number || ""} onChange={(value) => updateItem(index, "number", value)} />
							<TextControl label={__("Title", "ai-zippy")} value={item.title || ""} onChange={(value) => updateItem(index, "title", value)} />
							<TextareaControl label={__("Body", "ai-zippy")} value={item.body || ""} onChange={(value) => updateItem(index, "body", value)} />
							<Button isLink isDestructive onClick={() => removeItem(index)}>
								{__("Remove Point", "ai-zippy")}
							</Button>
						</div>
					))}
					<Button isSecondary onClick={addItem}>
						{__("Add Point", "ai-zippy")}
					</Button>
				</PanelBody>
			</InspectorControls>
			<section {...blockProps}>
				<div className="ctsrc__label">{attributes.label}</div>
				<h2 className="ctsrc__title">{titleLines.map((line, index) => <span key={index}>{line}{index < titleLines.length - 1 && <br />}</span>)}</h2>
				<div className="ctsrc__grid">
					<img className="ctsrc__image" src={attributes.imageUrl} alt="" />
					<div className="ctsrc__points">{items.map((item, index) => <div className="ctsrc__point" key={index}><span className="ctsrc__num">{item.number}</span><div><h4>{item.title}</h4><p>{item.body}</p></div></div>)}</div>
				</div>
			</section>
		</>
	);
}
