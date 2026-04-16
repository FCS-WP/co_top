import { __ } from "@wordpress/i18n";
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	useBlockProps,
} from "@wordpress/block-editor";
import { Button, PanelBody, SelectControl, TextControl, TextareaControl } from "@wordpress/components";

const presets = {
	quartz: {
		label: "Quartz Stone",
		title: "Engineered Perfection",
		body: "Composed of up to 93% natural quartz crystals, our surfaces offer the beauty of natural stone with superior consistency, durability, and hygiene.",
		cards: [
			{
				label: "Premium Quartz",
				name: "Hanstone Quartz",
				desc: "A globally recognised quartz brand offering 90+ colours with consistent pattern and superior resistance to scratches, stains, and heat. Ideal for kitchen countertops and bathroom vanities.",
				image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
				price: "",
				unit: "",
				note: "",
				features: ["Scratch Resistant", "Non-Porous", "90+ Colours", "NSF Certified"],
			},
			{
				label: "Value Quartz",
				name: "Cresto Quartz",
				desc: "An accessible yet premium quartz range offering excellent durability and a wide colour palette. Delivers exceptional value without compromising on performance or aesthetics.",
				image: "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=800&q=80",
				price: "$240",
				unit: "/ sqft installed",
				note: "Supply $120–$160/sqft",
				features: ["Stain Resistant", "Easy Clean", "Wide Palette", "Commercial Grade"],
			},
		],
	},
	solid: {
		label: "Solid Surface",
		title: "Seamless by Design",
		body: "Solid surface is the material of choice for architects and designers who demand seamless, hygienic, and infinitely customisable surfaces for high-end interiors.",
		cards: [
			{
				label: "Premium Solid Surface",
				name: "Hanex Solid Surface",
				desc: "One of Korea's most trusted solid surface brands. Hanex offers exceptional thermoformability - curved shapes, seamless joins, and integrated sink bowls. Perfect for reception counters, vanities, and bespoke furniture.",
				image: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80",
				price: "$380",
				unit: "/ sqft installed",
				note: "Supply $200-$260/sqft",
				features: ["Thermoformable", "Seamless Joins", "Repairable", "Anti-Bacterial"],
			},
			{
				label: "Value Solid Surface",
				name: "Cresto Solid Surface",
				desc: "A versatile solid surface range that balances cost-effectiveness with quality. Delivers consistent performance across residential and light commercial applications.",
				image: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80",
				price: "$280",
				unit: "/ sqft installed",
				note: "Supply $140-$180/sqft",
				features: ["Mouldable", "Non-Porous", "Easy Repair", "Multiple Finishes"],
			},
		],
	},
};

export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps({ className: "ctpb ctprod-section" });
	const preset = presets[attributes.variant] || presets.quartz;
	const cardsKey = attributes.variant === "solid" ? "solidCards" : "quartzCards";
	const cards = Array.isArray(attributes[cardsKey]) && attributes[cardsKey].length > 0
		? attributes[cardsKey]
		: preset.cards;

	const updateCards = (nextCards) => {
		setAttributes({ [cardsKey]: nextCards });
	};

	const updateCard = (index, key, value) => {
		const next = [...cards];
		next[index] = { ...(next[index] || {}), [key]: value };
		updateCards(next);
	};

	const updateCardFeatures = (index, value) => {
		const features = value
			.split(/\r\n|\r|\n/)
			.map((feature) => feature.trim())
			.filter(Boolean);

		updateCard(index, "features", features);
	};

	const addCard = () => {
		updateCards([
			...cards,
			{ label: "", name: "", desc: "", image: "", imageId: 0, price: "", unit: "", note: "", features: [] },
		]);
	};

	const removeCard = (index) => {
		updateCards(cards.filter((_, i) => i !== index));
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Product Section", "ai-zippy")} initialOpen>
					<SelectControl
						label={__("Variant", "ai-zippy")}
						value={attributes.variant}
						options={[
							{ label: "Quartz Stone", value: "quartz" },
							{ label: "Solid Surface", value: "solid" },
						]}
						onChange={(variant) => setAttributes({ variant })}
					/>
				</PanelBody>
				<PanelBody title={__("Cards", "ai-zippy")} initialOpen={false}>
					{cards.map((card, index) => (
						<div key={index}>
							<TextControl label={__("Label", "ai-zippy")} value={card.label || ""} onChange={(value) => updateCard(index, "label", value)} />
							<TextControl label={__("Name", "ai-zippy")} value={card.name || ""} onChange={(value) => updateCard(index, "name", value)} />
							<TextareaControl label={__("Description", "ai-zippy")} value={card.desc || ""} onChange={(value) => updateCard(index, "desc", value)} />
							<TextControl label={__("Price", "ai-zippy")} value={card.price || ""} onChange={(value) => updateCard(index, "price", value)} />
							<TextControl label={__("Unit", "ai-zippy")} value={card.unit || ""} onChange={(value) => updateCard(index, "unit", value)} />
							<TextControl label={__("Note", "ai-zippy")} value={card.note || ""} onChange={(value) => updateCard(index, "note", value)} />
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
							<TextareaControl
								label={__("Features (one per line)", "ai-zippy")}
								value={Array.isArray(card.features) ? card.features.join("\n") : ""}
								onChange={(value) => updateCardFeatures(index, value)}
							/>
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
				<div className="ctpb__label">{preset.label}</div>
				<h2 className="ctpb__title">{preset.title}</h2>
				<p className="ctpb__intro">{preset.body}</p>
				<div className="ctpb__grid">{cards.map((card, index) => <div className="ctpb__card" key={`${card.name}-${index}`}><div className="ctpb__img-wrap">{card.image && <img className="ctpb__img" src={card.image} alt={card.name || ""} />}</div><div className="ctpb__info"><div className="ctpb__brand-label">{card.label}</div><div className="ctpb__brand-name">{card.name}</div><p className="ctpb__desc">{card.desc}</p>{card.price && <div className="ctpb__price"><span>From</span><strong>{card.price}</strong><span>{card.unit}</span><small>{card.note}</small></div>}<div className="ctpb__features">{(Array.isArray(card.features) ? card.features : []).map((feature, featureIndex) => <span key={featureIndex}>{feature}</span>)}</div></div></div>)}</div>
			</section>
		</>
	);
}
