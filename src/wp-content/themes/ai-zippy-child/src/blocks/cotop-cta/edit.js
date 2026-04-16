import { __ } from "@wordpress/i18n";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { PanelBody, TextControl, TextareaControl } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps({ className: "ctcta" });

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("CTA Content", "ai-zippy")} initialOpen>
					<TextControl label={__("Background Word", "ai-zippy")} value={attributes.backgroundWord} onChange={(backgroundWord) => setAttributes({ backgroundWord })} />
					<TextControl label={__("Label", "ai-zippy")} value={attributes.label} onChange={(label) => setAttributes({ label })} />
					<TextControl label={__("Title", "ai-zippy")} value={attributes.title} onChange={(title) => setAttributes({ title })} />
					<TextareaControl label={__("Body", "ai-zippy")} value={attributes.body} onChange={(body) => setAttributes({ body })} />
					<TextControl label={__("Button Text", "ai-zippy")} value={attributes.buttonText} onChange={(buttonText) => setAttributes({ buttonText })} />
					<TextControl label={__("Button URL", "ai-zippy")} value={attributes.buttonUrl} onChange={(buttonUrl) => setAttributes({ buttonUrl })} />
				</PanelBody>
			</InspectorControls>
			<section {...blockProps}>
				<div className="ctcta__bg-word">{attributes.backgroundWord}</div>
				<div className="ctcta__label">{attributes.label}</div>
				<h2 className="ctcta__title">{attributes.title}</h2>
				<p className="ctcta__body">{attributes.body}</p>
				<span className="ctcta__btn">{attributes.buttonText}</span>
			</section>
		</>
	);
}
