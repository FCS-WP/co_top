import { __ } from "@wordpress/i18n";
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	useBlockProps,
} from "@wordpress/block-editor";
import { Button, PanelBody, TextControl, TextareaControl } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps({ className: "ctco" });
	const paragraphs = attributes.body.split(/\n\s*\n/).filter(Boolean);
	const titleLines = attributes.title.split(/\r\n|\r|\n/);
	const stats = Array.isArray(attributes.stats) ? attributes.stats : [];
	const hasImage = Boolean(attributes.imageUrl);

	const updateStat = (index, key, value) => {
		const next = [...stats];
		next[index] = { ...(next[index] || {}), [key]: value };
		setAttributes({ stats: next });
	};

	const addStat = () => {
		setAttributes({
			stats: [...stats, { number: "", label: "" }],
		});
	};

	const removeStat = (index) => {
		setAttributes({ stats: stats.filter((_, i) => i !== index) });
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Content", "ai-zippy")} initialOpen>
					<TextControl label={__("Label", "ai-zippy")} value={attributes.label} onChange={(label) => setAttributes({ label })} />
					<TextareaControl label={__("Title", "ai-zippy")} value={attributes.title} onChange={(title) => setAttributes({ title })} />
					<TextareaControl label={__("Body", "ai-zippy")} value={attributes.body} onChange={(body) => setAttributes({ body })} rows={8} />
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
				<PanelBody title={__("Stats", "ai-zippy")} initialOpen={false}>
					{stats.map((stat, index) => (
						<div key={index}>
							<TextControl
								label={__("Number", "ai-zippy")}
								value={stat.number || ""}
								onChange={(value) => updateStat(index, "number", value)}
							/>
							<TextControl
								label={__("Label", "ai-zippy")}
								value={stat.label || ""}
								onChange={(value) => updateStat(index, "label", value)}
							/>
							<Button isLink isDestructive onClick={() => removeStat(index)}>
								{__("Remove Stat", "ai-zippy")}
							</Button>
						</div>
					))}
					<Button isSecondary onClick={addStat}>
						{__("Add Stat", "ai-zippy")}
					</Button>
				</PanelBody>
			</InspectorControls>
			<section {...blockProps}>
				<div>
					<div className="ctco__label">{attributes.label}</div>
					<h2 className="ctco__title">{titleLines.map((line, index) => <span key={index}>{line}{index < titleLines.length - 1 && <br />}</span>)}</h2>
					<div className="ctco__body">{paragraphs.map((text, index) => <p key={index}>{text}</p>)}</div>
					<span className="ctco__btn">{attributes.buttonText}</span>
				</div>
				<div>
					<div className="ctco__stats">{stats.map((stat, index) => <div className="ctco__stat" key={index}><span className="ctco__big">{stat.number}</span><span className="ctco__stat-label">{stat.label}</span></div>)}</div>
					<img className="ctco__image" src={attributes.imageUrl} alt="" />
				</div>
			</section>
		</>
	);
}
