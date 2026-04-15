import { __ } from "@wordpress/i18n";
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	useBlockProps,
} from "@wordpress/block-editor";
import { Button, PanelBody, TextControl, TextareaControl } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps({ className: "ctph" });
	const hasBackground = Boolean(attributes.backgroundUrl);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Hero Content", "ai-zippy")} initialOpen>
					<TextControl label={__("Tagline", "ai-zippy")} value={attributes.tagline} onChange={(tagline) => setAttributes({ tagline })} />
					<TextControl label={__("Title", "ai-zippy")} value={attributes.title} onChange={(title) => setAttributes({ title })} />
					<TextControl label={__("Emphasis", "ai-zippy")} value={attributes.emphasis} onChange={(emphasis) => setAttributes({ emphasis })} />
					<TextareaControl label={__("Body", "ai-zippy")} value={attributes.body} onChange={(body) => setAttributes({ body })} />
					<TextareaControl label={__("Note", "ai-zippy")} value={attributes.note} onChange={(note) => setAttributes({ note })} />
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) => setAttributes({ backgroundId: media?.id || 0, backgroundUrl: media?.url || "" })}
							allowedTypes={["image"]}
							value={attributes.backgroundId}
							render={({ open }) => (
								<Button isSecondary onClick={open}>
									{hasBackground ? __("Replace Background Image", "ai-zippy") : __("Select Background Image", "ai-zippy")}
								</Button>
							)}
						/>
					</MediaUploadCheck>
					{hasBackground && (
						<Button isLink isDestructive onClick={() => setAttributes({ backgroundId: 0, backgroundUrl: "" })}>
							{__("Remove Background Image", "ai-zippy")}
						</Button>
					)}
				</PanelBody>
			</InspectorControls>
			<section {...blockProps}>
				<div className="ctph__bg" style={{ backgroundImage: `url('${attributes.backgroundUrl}')` }} />
				<div className="ctph__content">
					<div className="ctph__tag">{attributes.tagline}</div>
					<h1 className="ctph__title">{attributes.title}<br /><em>{attributes.emphasis}</em></h1>
					<p className="ctph__body">{attributes.body}</p>
					{attributes.note && <p className="ctph__note">{attributes.note}</p>}
				</div>
			</section>
		</>
	);
}
