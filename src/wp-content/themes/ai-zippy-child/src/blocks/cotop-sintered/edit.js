import { __ } from "@wordpress/i18n";
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	useBlockProps,
} from "@wordpress/block-editor";
import { Button, PanelBody, TextControl, TextareaControl } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps({ className: "ctsin ctprod-section" });
	const titleLines = attributes.title.split(/\r\n|\r|\n/);
	const items = Array.isArray(attributes.items) ? attributes.items : [];
	const hasHeroImage = Boolean(attributes.imageUrl);

	const updateItem = (index, key, value) => {
		const next = [...items];
		next[index] = { ...(next[index] || {}), [key]: value };
		setAttributes({ items: next });
	};

	const updateItemFeatures = (index, value) => {
		const features = value
			.split(/\r\n|\r|\n/)
			.map((feature) => feature.trim())
			.filter(Boolean);

		updateItem(index, "features", features);
	};

	const addItem = () => {
		setAttributes({
			items: [...items, { label: "", name: "", body: "", price: "", unit: "", image: "", imageId: 0, features: [] }],
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
					<TextareaControl label={__("Body", "ai-zippy")} value={attributes.body} onChange={(body) => setAttributes({ body })} />
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) => setAttributes({ imageId: media?.id || 0, imageUrl: media?.url || "" })}
							allowedTypes={["image"]}
							value={attributes.imageId}
							render={({ open }) => (
								<Button isSecondary onClick={open}>
									{hasHeroImage ? __("Replace Hero Image", "ai-zippy") : __("Select Hero Image", "ai-zippy")}
								</Button>
							)}
						/>
					</MediaUploadCheck>
					{hasHeroImage && (
						<Button isLink isDestructive onClick={() => setAttributes({ imageId: 0, imageUrl: "" })}>
							{__("Remove Hero Image", "ai-zippy")}
						</Button>
					)}
				</PanelBody>
				<PanelBody title={__("Cards", "ai-zippy")} initialOpen={false}>
					{items.map((item, index) => (
						<div key={index}>
							<TextControl label={__("Label", "ai-zippy")} value={item.label || ""} onChange={(value) => updateItem(index, "label", value)} />
							<TextControl label={__("Name", "ai-zippy")} value={item.name || ""} onChange={(value) => updateItem(index, "name", value)} />
							<TextareaControl label={__("Body", "ai-zippy")} value={item.body || ""} onChange={(value) => updateItem(index, "body", value)} />
							<TextControl label={__("Price", "ai-zippy")} value={item.price || ""} onChange={(value) => updateItem(index, "price", value)} />
							<TextControl label={__("Unit", "ai-zippy")} value={item.unit || ""} onChange={(value) => updateItem(index, "unit", value)} />
							<MediaUploadCheck>
								<MediaUpload
									onSelect={(media) => {
										updateItem(index, "image", media?.url || "");
										updateItem(index, "imageId", media?.id || 0);
									}}
									allowedTypes={["image"]}
									value={item.imageId || 0}
									render={({ open }) => (
										<Button isSecondary onClick={open}>
											{item.image ? __("Replace Card Image", "ai-zippy") : __("Select Card Image", "ai-zippy")}
										</Button>
									)}
								/>
							</MediaUploadCheck>
							{item.image && (
								<Button
									isLink
									isDestructive
									onClick={() => {
										updateItem(index, "image", "");
										updateItem(index, "imageId", 0);
									}}
								>
									{__("Remove Card Image", "ai-zippy")}
								</Button>
							)}
							<TextareaControl
								label={__("Features (one per line)", "ai-zippy")}
								value={Array.isArray(item.features) ? item.features.join("\n") : ""}
								onChange={(value) => updateItemFeatures(index, value)}
							/>
							<Button isLink isDestructive onClick={() => removeItem(index)}>
								{__("Remove Card", "ai-zippy")}
							</Button>
						</div>
					))}
					<Button isSecondary onClick={addItem}>
						{__("Add Card", "ai-zippy")}
					</Button>
				</PanelBody>
			</InspectorControls>
			<section {...blockProps}>
				<div className="ctsin__label">{attributes.label}</div>
				<h2 className="ctsin__title">{titleLines.map((line, index) => <span key={index}>{line}{index < titleLines.length - 1 && <br />}</span>)}</h2>
				<p className="ctsin__intro">{attributes.body}</p>
				<img className="ctsin__hero-img" src={attributes.imageUrl} alt="" />
				<div className="ctsin__grid">{items.map((item, index) => <div className="ctsin__card" key={index}><div className="ctsin__img-wrap"><img className="ctsin__img" src={item.image} alt="" /></div><div className="ctsin__info"><div className="ctsin__brand-label">{item.label}</div><div className="ctsin__name">{item.name}</div><p>{item.body}</p><div className="ctsin__price"><span>From</span><strong>{item.price}</strong><span>{item.unit}</span></div><div className="ctsin__features">{(Array.isArray(item.features) ? item.features : []).map((feature, featureIndex) => <span key={featureIndex}>{feature}</span>)}</div></div></div>)}</div>
			</section>
		</>
	);
}
