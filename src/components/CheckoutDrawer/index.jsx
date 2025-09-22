
//taxa de entrega x mensagem ao usuario + chave pix  
import {
  DollarSign,
  MinusCircle,
  PlusCircle,
  Store,
  Truck,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import PixIcon from "../PixIcon";
import {
  CartList,
  CloseButton,
  Content,
  ControlButton,
  DrawerContainer,
  FeeMessage,
  FinalizeButton,
  Footer,
  Form,
  FormGroup,
  Header,
  Input,
  Item,
  ItemControls,
  ItemImage,
  ItemInfo,
  ItemName,
  ItemPrice,
  ItemQuantity,
  Label,
  OptionButton,
  OptionsGroup,
  Overlay,
  SectionTitle,
  Total,
} from "./styles";

// taxa da entrega soma +7
const DELIVERY_FEE = 7.0;
//cima
const ObservationInput = ({ value = "", onChange }) => (
  <FormGroup>
    <Label htmlFor="observation">Observações</Label>
    <Input
      as="textarea"
      id="observation"
      name="observation"
      placeholder="Ex: retirar cebola, ponto da carne, trazer maquininha de cartão..."
      value={value ?? ""}
      onChange={onChange}
      rows="2"
    />
  </FormGroup>
);

const CheckoutDrawer = ({
  isOpen,
  onClose,
  cartItems,
  cartTotal,
  onUpdateQuantity,
  onPixCheckout,
  onCashCheckout, // novo: vem do Home
  formData = { name: "", phone: "", address: "", observation: "", change: "" },
  onFormChange,
  deliveryType,
  onDeliveryTypeChange,
  showToast,
}) => {
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [errors, setErrors] = useState({});

  const fd = {
    name: "",
    phone: "",
    address: "",
    observation: "",
    change: "",
    ...formData,
  };

  const finalTotal = useMemo(() => {
    let total = cartTotal;
    if (deliveryType === "delivery") total += DELIVERY_FEE;
    return total;
  }, [cartTotal, deliveryType]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    if (!e || !e.target) return;
    const { name, value } = e.target;
    if (typeof onFormChange === "function") {
      onFormChange((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!(fd.name || "").trim()) newErrors.name = true;
    if (deliveryType === "delivery") {
      if (!(fd.phone || "").trim()) newErrors.phone = true;
      if (!(fd.address || "").trim()) newErrors.address = true;
    }
    if (paymentMethod === "dinheiro" && !(fd.change || "").trim()) {
      newErrors.change = true;
    }
    return newErrors;
  };

  const handleFinalizeOrder = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      if (formErrors.change) {
        showToast(
          "Por favor, informe o troco. Se não precisar, digite 'não'",
          4000,
          "error"
        );
      } else {
        showToast("Por favor, preencha os campos em vermelho.", 3000, "error");
      }
      setErrors(formErrors);
      return;
    }
    setErrors({});

    if (paymentMethod === "pix") {
      onPixCheckout(finalTotal);
    } else {
      const getPaymentMethodText = () => {
        switch (paymentMethod) {
          case "dinheiro":
            return `Dinheiro (Troco para R$ ${fd.change || "sem troco"})`;
          default:
            return "";
        }
      };

      const paymentMethodText = getPaymentMethodText();

      const orderSummary = cartItems
        .map((item) => `• ${item.quantity}x ${item.name}`)
        .join("  ");

      const deliveryInfo =
        deliveryType === "delivery"
          ? `-*-Telefone:-*- ${fd.phone}-*-Endereço:-*- ${fd.address}-*-Taxa de Entrega:-*- R$ ${DELIVERY_FEE.toFixed(
            2
          ).replace(".", ",")}`
          : "*Modalidade:* Retirar na Loja";

      const observationInfo = fd.observation
        ? `*-----Observações:-----*${fd.observation}`
        : "";

      const message = `
        *---------- NOVO PEDIDO ----------*

        *CLIENTE:*
        *Nome:* ${fd.name}

        *ITENS DO PEDIDO:*
        ${orderSummary}

       *ENTREGA:*
        ${deliveryInfo}${observationInfo}

       *------------------------------------*
       *TOTAL:* *R$ ${finalTotal.toFixed(2).replace(".", ",")}*
       *PAGAMENTO:* ${paymentMethodText}
      `;

      // número de destino
      const whatsappNumber = "5548991691906";

      // abre o WhatsApp com encodeURIComponent (mais seguro que só %0A/%20)
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

      window.open(whatsappUrl, "_blank");

      if (typeof onCashCheckout === "function") {
        onCashCheckout();
      }

      onClose();
    }
  };

  return (
    <Overlay>
      <DrawerContainer onClick={(e) => e.stopPropagation()}>
        <Header>
          <h2>Finalizar Pedido</h2>
          <CloseButton onClick={onClose}>
            <X size={24} />
          </CloseButton>
        </Header>
        <Content>
          <SectionTitle>Seu Pedido</SectionTitle>
          <CartList>
            {cartItems.map((item) => (
              <Item key={item.id}>
                <ItemImage src={item.image} alt={item.name} />
                <ItemInfo>
                  <ItemName>{item.name}</ItemName>
                  <ItemPrice>
                    R$ {item.price.toFixed(2).replace(".", ",")}
                  </ItemPrice>
                </ItemInfo>
                <ItemControls>
                  <ControlButton
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  >
                    <MinusCircle size={20} />
                  </ControlButton>
                  <ItemQuantity>{item.quantity}</ItemQuantity>
                  <ControlButton
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    <PlusCircle size={20} />
                  </ControlButton>
                </ItemControls>
              </Item>
            ))}
          </CartList>

          <SectionTitle>Opção de Entrega</SectionTitle>
          <OptionsGroup>
            <OptionButton
              $isActive={deliveryType === "pickup"}
              onClick={() => onDeliveryTypeChange("pickup")}
            >
              <Store size={28} /> {/* anderson aqui: ícone maior */}
              <span style={{ fontWeight: 900, fontSize: "15px", letterSpacing: "1px" }}>
                Retirar na Loja
              </span>
            </OptionButton>

            <OptionButton
              $isActive={deliveryType === "delivery"}
              onClick={() => onDeliveryTypeChange("delivery")}
            >
              <Truck size={48} /> {/* anderson aqui: ícone maior */}
              <span style={{ fontWeight: 900, fontSize: "15px", letterSpacing: "1px" }}>
                Taxa de entrega: R$ 7,00
              </span>
            </OptionButton>
          </OptionsGroup>


          <SectionTitle>Seus Dados</SectionTitle>
          <Form>
            <FormGroup>
              <Label htmlFor="name">Seu Nome</Label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Ex: Se for Pix Titular / Recebedor(a)"
                value={fd.name}
                onChange={handleInputChange}
                $isInvalid={!!errors.name}
                required
              />
            </FormGroup>
            {deliveryType === "delivery" ? (
              <>
                <FormGroup>
                  <Label htmlFor="phone">Telefone (WhatsApp)</Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Ex: 48 99999-8888"
                    value={fd.phone}
                    onChange={handleInputChange}
                    $isInvalid={!!errors.phone}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="address">Endereço Completo</Label>
                  <Input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Ex: Rua das Flores, 123, Bairro"
                    value={fd.address}
                    onChange={handleInputChange}
                    $isInvalid={!!errors.address}
                    required
                  />
                </FormGroup>
              </>
            ) : null}

            <ObservationInput
              value={fd.observation}
              onChange={handleInputChange}
            />

            {deliveryType === "delivery" && (//taxa de entrega
              <FeeMessage type="delivery">
                Taxa de entrega: R$ {DELIVERY_FEE.toFixed(2).replace(".", ",")} <br />
                <small>(Até 6 km após, será adicionada uma taxa extra de R$ 2,00 por km)</small>
              </FeeMessage>
            )}


            {paymentMethod === "dinheiro" && (
              <FormGroup>
                <Label htmlFor="change">Troco para quanto?</Label>
                <Input
                  type="text"
                  id="change"
                  name="change"
                  placeholder="Ex: 50,00 ou digite 'não'"
                  value={fd.change}
                  onChange={handleInputChange}
                  $isInvalid={!!errors.change}
                />
              </FormGroup>
            )}
          </Form>

          <SectionTitle>Forma de Pagamento</SectionTitle>
          <OptionsGroup>
            <OptionButton
              $isActive={paymentMethod === "pix"}
              onClick={() => setPaymentMethod("pix")}
            >
              <PixIcon size={20} /> PIX
            </OptionButton>

            <OptionButton
              $isActive={paymentMethod === "dinheiro"}
              onClick={() => setPaymentMethod("dinheiro")}
            >
              <DollarSign size={20} /> Dinheiro
            </OptionButton>
          </OptionsGroup>
        </Content>

        <Footer>
          <Total>
            <span>Total:</span>
            <span>R$ {finalTotal.toFixed(2).replace(".", ",")}</span>
          </Total>
          <FinalizeButton onClick={handleFinalizeOrder}>
            {paymentMethod === "pix" ? "Pagar com PIX" : "Enviar Pedido"}
          </FinalizeButton>
        </Footer>
      </DrawerContainer>
    </Overlay>
  );
};

export default CheckoutDrawer;
