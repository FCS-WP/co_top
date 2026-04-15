import { __ } from "@wordpress/i18n";
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	useBlockProps,
} from "@wordpress/block-editor";
import { Button, PanelBody, TextControl, TextareaControl } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps({ className: "ctmat" });
	const cards = Array.isArray(attributes.cards) ? attributes.cards : [];
	const titleLines = attributes.title.split(/\r\n|\r|\n/);

	const updateCard = (index, key, value) => {
		const next = [...cards];
		next[index] = { ...(next[index] || {}), [key]: value };
		setAttributes({ cards: next });
	};

	const addCard = () => {
		setAttributes({
			cards: [...cards, { type: "", name: "", desc: "", from: "", unit: "", note: "", image: "", imageId: 0, url: "" }],
		});
	};

	const removeCard = (index) => {
		setAttributes({ cards: cards.filter((_, i) => i !== index) });
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Section Content", "ai-zippy")} initialOpen>
					<TextControl label={__("Label", "ai-zippy")} value={attributes.label} onChange={(label) => setAttributes({ label })} />
					<TextareaControl label={__("Title", "ai-zippy")} value={attributes.title} onChange={(title) => setAttributes({ title })} />
					<TextareaControl label={__("Intro", "ai-zippy")} value={attributes.intro} onChange={(intro) => setAttributes({ intro })} />
				</PanelBody>
				<PanelBody title={__("Cards", "ai-zippy")} initialOpen={false}>
					{cards.map((card, index) => (
						<div key={index}>
							<TextControl label={__("Type", "ai-zippy")} value={card.type || ""} onChange={(value) => updateCard(index, "type", value)} />
							<TextControl label={__("Name", "ai-zippy")} value={card.name || ""} onChange={(value) => updateCard(index, "name", value)} />
							<TextareaControl label={__("Description", "ai-zippy")} value={card.desc || ""} onChange={(value) => updateCard(index, "desc", value)} />
							<TextControl label={__("From Price", "ai-zippy")} value={card.from || ""} onChange={(value) => updateCard(index, "from", value)} />
							<TextControl label={__("Price Unit", "ai-zippy")} value={card.unit || ""} onChange={(value) => updateCard(index, "unit", value)} />
							<TextControl label={__("Price Note", "ai-zippy")} value={card.note || ""} onChange={(value) => updateCard(index, "note", value)} />
							<TextControl label={__("Card URL", "ai-zippy")} value={card.url || ""} onChange={(value) => updateCard(index, "url", value)} />
							<MediaUploadCheck>
								<MediaUpload
									onSelect={(media) => {
										updateCard(index, "imageId", media?.id || 0);
										updateCard(index, "image", media?.url || "");
									}}
									allowedTypes={["image"]}
									value={card.imageId || 0}
									render={({ open }) => (
										<Button isSecondary onClick={open}>
											{card.image ? __("Replace Card Image", "ai-zippy") : __("Select Card Image", "ai-zippy")}
										</Button>
									)}
								/>
							</MediaUploadCheck>
							{card.image && (
								<Button
									isLink
									isDestructive
									onClick={() => {
										updateCard(index, "imageId", 0);
										updateCard(index, "image", "");
									}}
								>
									{__("Remove Card Image", "ai-zippy")}
								</Button>
							)}
							<Button isLink isDestructive onClick={() => removeCard(index)}>
								{__("Remove Card", "ai-zippy")}
							</Button>
						</div>
					))}
					<Button isSecondary onClick={addCard}>
						{__("Add Card", "ai-zippy")}
					</Button>
				</PanelBody>
			</InspectorControls>
			<section {...blockProps}>
				<div className="ctmat__intro">
					<div>
						<div className="ctmat__label">{attributes.label}</div>
						<h2 className="ctmat__title">
							{titleLines.map((line, index) => (
								<span key={index}>{line}{index < titleLines.length - 1 && <br />}</span>
							))}
						</h2>
					</div>
					<p>{attributes.intro}</p>
				</div>
				<div className="ctmat__grid">
					{cards.map((card, index) => (
						<div className="ctmat__card" key={index}>
							<div className="ctmat__img-wrap"><img className="ctmat__img" src={card.image} alt="" /></div>
							<div className="ctmat__info">
								<div className="ctmat__type">{card.type}</div>
								<div className="ctmat__name">{card.name}</div>
								<p className="ctmat__desc">{card.desc}</p>
								<div className="ctmat__price"><span className="ctmat__price-from">From</span><span className="ctmat__price-amount">{card.from}</span><span className="ctmat__price-unit">{card.unit}</span><span className="ctmat__price-note">{card.note}</span></div>
								<span className="ctmat__link">Explore Collection <span>→</span></span>
							</div>
						</div>
					))}
				</div>
			</section>
		</>
	);
}
