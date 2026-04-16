import { __ } from "@wordpress/i18n";
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	useBlockProps,
} from "@wordpress/block-editor";
import { Button, PanelBody, TextControl, TextareaControl } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps({ className: "ctao" });
	const hasMainImage = Boolean(attributes.mainImageUrl);
	const hasInsetImage = Boolean(attributes.insetImageUrl);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Content", "ai-zippy")} initialOpen>
					<TextControl label={__("Label", "ai-zippy")} value={attributes.label} onChange={(label) => setAttributes({ label })} />
					<TextareaControl label={__("Title", "ai-zippy")} value={attributes.title} onChange={(title) => setAttributes({ title })} />
					<TextControl label={__("Emphasis", "ai-zippy")} value={attributes.emphasis} onChange={(emphasis) => setAttributes({ emphasis })} />
					<TextareaControl label={__("Body One", "ai-zippy")} value={attributes.bodyOne} onChange={(bodyOne) => setAttributes({ bodyOne })} />
					<TextareaControl label={__("Body Two", "ai-zippy")} value={attributes.bodyTwo} onChange={(bodyTwo) => setAttributes({ bodyTwo })} />
				</PanelBody>
				<PanelBody title={__("Images", "ai-zippy")} initialOpen={false}>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) => setAttributes({ mainImageId: media?.id || 0, mainImageUrl: media?.url || "" })}
							allowedTypes={["image"]}
							value={attributes.mainImageId}
							render={({ open }) => (
								<Button isSecondary onClick={open}>
									{hasMainImage ? __("Replace Main Image", "ai-zippy") : __("Select Main Image", "ai-zippy")}
								</Button>
							)}
						/>
					</MediaUploadCheck>
					{hasMainImage && (
						<Button isLink isDestructive onClick={() => setAttributes({ mainImageId: 0, mainImageUrl: "" })}>
							{__("Remove Main Image", "ai-zippy")}
						</Button>
					)}

					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) => setAttributes({ insetImageId: media?.id || 0, insetImageUrl: media?.url || "" })}
							allowedTypes={["image"]}
							value={attributes.insetImageId}
							render={({ open }) => (
								<Button isSecondary onClick={open}>
									{hasInsetImage ? __("Replace Inset Image", "ai-zippy") : __("Select Inset Image", "ai-zippy")}
								</Button>
							)}
						/>
					</MediaUploadCheck>
					{hasInsetImage && (
						<Button isLink isDestructive onClick={() => setAttributes({ insetImageId: 0, insetImageUrl: "" })}>
							{__("Remove Inset Image", "ai-zippy")}
						</Button>
					)}
				</PanelBody>
			</InspectorControls>
			<section {...blockProps}>
				<div className="ctao__grid">
					<div className="ctao__copy">
						<div className="ctao__label">{attributes.label}</div>
						<h2 className="ctao__title">
							{attributes.title.split(/\r\n|\r|\n/).map((line, index) => (
								<span key={index}>{line}{index < attributes.title.split(/\r\n|\r|\n/).length - 1 && <br />}</span>
							))}
							<br /><em>{attributes.emphasis}</em>
						</h2>
						<p className="ctao__body">{attributes.bodyOne}</p>
						<p className="ctao__body ctao__body--spaced">{attributes.bodyTwo}</p>
						<span className="ctao__btn">{attributes.buttonText}</span>
					</div>
					<div className="ctao__images">
						<img className="ctao__img-main" src={attributes.mainImageUrl} alt="" />
						<img className="ctao__img-inset" src={attributes.insetImageUrl} alt="" />
						<div className="ctao__badge"><span className="ctao__badge-num">{attributes.badgeNumber}</span><span className="ctao__badge-label">{attributes.badgeLabel}</span></div>
					</div>
				</div>
			</section>
		</>
	);
}
