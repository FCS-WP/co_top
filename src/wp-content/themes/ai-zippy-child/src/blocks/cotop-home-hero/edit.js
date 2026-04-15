import { __ } from "@wordpress/i18n";
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	useBlockProps,
} from "@wordpress/block-editor";
import {
	Button,
	PanelBody,
	TextControl,
	TextareaControl,
} from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps({ className: "cth" });
	const stats = Array.isArray(attributes.stats) ? attributes.stats : [];
	const hasBackground = Boolean(attributes.backgroundUrl);

	const updateStat = (index, key, value) => {
		const next = [...stats];
		next[index] = {
			...(next[index] || {}),
			[key]: value,
		};
		setAttributes({ stats: next });
	};

	const addStat = () => {
		setAttributes({
			stats: [...stats, { number: "", label: "" }],
		});
	};

	const removeStat = (index) => {
		setAttributes({
			stats: stats.filter((_, i) => i !== index),
		});
	};

	const onSelectBackground = (media) => {
		if (!media) return;

		setAttributes({
			backgroundId: media.id || 0,
			backgroundUrl: media.url || "",
			backgroundAlt: media.alt || media.title || "",
		});
	};

	const removeBackground = () => {
		setAttributes({
			backgroundId: 0,
			backgroundUrl: "",
			backgroundAlt: "",
		});
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Hero Content", "ai-zippy")} initialOpen>
					<TextControl label={__("Tagline", "ai-zippy")} value={attributes.tagline} onChange={(tagline) => setAttributes({ tagline })} />
					<TextControl label={__("Title Before", "ai-zippy")} value={attributes.titleBefore} onChange={(titleBefore) => setAttributes({ titleBefore })} />
					<TextControl label={__("Title Emphasis", "ai-zippy")} value={attributes.titleEmphasis} onChange={(titleEmphasis) => setAttributes({ titleEmphasis })} />
					<TextControl label={__("Title After", "ai-zippy")} value={attributes.titleAfter} onChange={(titleAfter) => setAttributes({ titleAfter })} />
					<TextareaControl label={__("Description", "ai-zippy")} value={attributes.description} onChange={(description) => setAttributes({ description })} />
				</PanelBody>
				<PanelBody title={__("Actions", "ai-zippy")} initialOpen={false}>
					<TextControl label={__("Primary Text", "ai-zippy")} value={attributes.primaryText} onChange={(primaryText) => setAttributes({ primaryText })} />
					<TextControl label={__("Primary URL", "ai-zippy")} value={attributes.primaryUrl} onChange={(primaryUrl) => setAttributes({ primaryUrl })} />
					<TextControl label={__("Secondary Text", "ai-zippy")} value={attributes.secondaryText} onChange={(secondaryText) => setAttributes({ secondaryText })} />
					<TextControl label={__("Secondary URL", "ai-zippy")} value={attributes.secondaryUrl} onChange={(secondaryUrl) => setAttributes({ secondaryUrl })} />
				</PanelBody>
				<PanelBody title={__("Background", "ai-zippy")} initialOpen={false}>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={onSelectBackground}
							allowedTypes={["image"]}
							value={attributes.backgroundId}
							render={({ open }) => (
								<Button isSecondary onClick={open}>
									{hasBackground
										? __("Replace Background Image", "ai-zippy")
										: __("Select Background Image", "ai-zippy")}
								</Button>
							)}
						/>
					</MediaUploadCheck>
					{hasBackground && (
						<Button isLink isDestructive onClick={removeBackground}>
							{__("Remove Background Image", "ai-zippy")}
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
				<div
					className="cth__bg"
					style={hasBackground ? { backgroundImage: `url('${attributes.backgroundUrl}')` } : undefined}
				/>
				<div className="cth__content">
					<div className="cth__tag">{attributes.tagline}</div>
					<h1 className="cth__title">
						{attributes.titleBefore} <em>{attributes.titleEmphasis}</em><br />
						{attributes.titleAfter}
					</h1>
					<p className="cth__sub">{attributes.description}</p>
					<div className="cth__actions">
						<span className="cth__btn cth__btn--primary">{attributes.primaryText}</span>
						<span className="cth__btn cth__btn--ghost">{attributes.secondaryText}</span>
					</div>
				</div>
				<div className="cth__stats">
					{stats.map((stat, index) => (
						<div className="cth__stat" key={index}>
							<span className="cth__stat-num">{stat.number}</span>
							<span className="cth__stat-label">{stat.label}</span>
						</div>
					))}
				</div>
			</section>
		</>
	);
}
