import { useState, useContext } from "react"
import { formatter } from "../utils/helpers"
import ProductOptions from "./ProductOptions"

export default function ProductForm({ product }) {
    //wir checken ob Produktvarianten existieren und wenn ja gehen wir die jeweils durch, nennen jede Variante variant
    const allVariantOptions = product.variants.edges?.map(variant => {

        //Objekt allOptions erstellen
        const allOptions = {}

        //Alle für die entsprechende Variante geltenden Optionen (selectedOptions) werden in das Objekt allOptions gepackt mit dem key item.name und dem value item.value -> das sind jeweils properties die die selectedOption von der API mitgeschickt bekommt
        variant.node.selectedOptions.map(item =>{
            allOptions[item.name] = item.value
        })

        return {
            id: variant.node.id,
            title: product.title,
            handle: product.handle,
            image: variant.node.image?.url,
            options: allOptions,
            variantTitle: variant.node.title,
            variantPrice: variant.node.priceV2.amount,
            variantQuantity: 1
        }
    })

    const defaultValues = {}
    product.options.map(item => {
        defaultValues[item.name] = item.values[0] //Wenn die Seite zum ersten mal geladen wird soll der option selecter die ersten values dieser variante auswählen
    })

    //selectedVariant ist eine state variable in der der aktuelle state gespeichert wird, setSelectedVariant ist die Funktion mit der der State aktualisiert wird und zwar wird der state zu allVariantOptions[0] geändert:
    const[selectedVariant, setSelectedVariant] = useState(allVariantOptions[0])
    const[selectedOptions, setSelectedOptions] = useState(defaultValues)

    function setOptions(name, value){
        setSelectedOptions(prevState =>{
            return { ...prevState, [name]: value} //der momentane state in der state variablen selectedOptions wird ersetzt durch den name und value die der function beim callen mitgegeben wurden
        })
    }

    return (
        <div className="rounded-2xl p-4 shadow-lg flex flex-col w-full md:w-1/3">
            <h2 className="text-3xl font-bold">{ product.title }</h2>
            <span className="pb-6">{ formatter.format(product.variants.edges[0].node.priceV2.amount) }</span>

            {
                product.options.map(({name, values}) => (
                    <ProductOptions 
                        key={`key-${name}`}
                        name={name}
                        values={values}
                        selectedOptions={selectedOptions}
                        setOptions={setOptions}
                    />
                ))
            }
            <button className="bg-black rounded-lg text-white px-2 py-3 hover:bg-gray-800">Add To Cart</button>
        </div>
    )
}
