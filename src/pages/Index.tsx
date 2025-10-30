import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Tea {
  id: number;
  name: string;
  description: string;
  price: number;
  weight: string;
  image: string;
}

interface CartItem extends Tea {
  quantity: number;
}

const teas: Tea[] = [
  {
    id: 1,
    name: 'Травяной сбор "Луговой"',
    description: 'Натуральный сбор из луговых трав с мятой, мелиссой и чабрецом. Успокаивает и тонизирует.',
    price: 450,
    weight: '100г',
    image: 'https://cdn.poehali.dev/projects/4a950c3e-2eae-4a1d-a94b-cfdceda3c83a/files/03ff36d3-227e-44db-8c93-8b7cf2142910.jpg'
  },
  {
    id: 2,
    name: 'Черный чай "Граф Грей"',
    description: 'Классический черный чай с бергамотом. Изысканный аромат и насыщенный вкус.',
    price: 520,
    weight: '100г',
    image: 'https://cdn.poehali.dev/projects/4a950c3e-2eae-4a1d-a94b-cfdceda3c83a/files/7273e76d-86eb-4f8f-93e0-bd0870623be6.jpg'
  },
  {
    id: 3,
    name: 'Ромашковый сбор',
    description: 'Нежный ромашковый чай с добавлением липы и мяты. Идеален перед сном.',
    price: 380,
    weight: '100г',
    image: 'https://cdn.poehali.dev/projects/4a950c3e-2eae-4a1d-a94b-cfdceda3c83a/files/665c072a-968d-4fa1-ae86-0dba970dbf09.jpg'
  },
  {
    id: 4,
    name: 'Витаминный микс',
    description: 'Фруктово-ягодный сбор с шиповником, яблоком и малиной. Богат витаминами.',
    price: 490,
    weight: '100г',
    image: 'https://cdn.poehali.dev/projects/4a950c3e-2eae-4a1d-a94b-cfdceda3c83a/files/03ff36d3-227e-44db-8c93-8b7cf2142910.jpg'
  },
  {
    id: 5,
    name: 'Зеленый с жасмином',
    description: 'Премиальный зеленый чай с цветами жасмина. Деликатный цветочный аромат.',
    price: 580,
    weight: '100г',
    image: 'https://cdn.poehali.dev/projects/4a950c3e-2eae-4a1d-a94b-cfdceda3c83a/files/7273e76d-86eb-4f8f-93e0-bd0870623be6.jpg'
  },
  {
    id: 6,
    name: 'Иван-чай ферментированный',
    description: 'Традиционный русский чай. Не содержит кофеин, укрепляет иммунитет.',
    price: 420,
    weight: '100г',
    image: 'https://cdn.poehali.dev/projects/4a950c3e-2eae-4a1d-a94b-cfdceda3c83a/files/665c072a-968d-4fa1-ae86-0dba970dbf09.jpg'
  }
];

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    comment: '',
    deliveryMethod: 'courier',
    paymentMethod: 'card'
  });

  const addToCart = (tea: Tea) => {
    const existingItem = cart.find(item => item.id === tea.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === tea.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...tea, quantity: 1 }]);
    }
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getDeliveryPrice = () => {
    if (orderForm.deliveryMethod === 'courier') return getTotalPrice() >= 2000 ? 0 : 300;
    if (orderForm.deliveryMethod === 'pickup') return 0;
    return 400;
  };

  const getFinalPrice = () => {
    return getTotalPrice() + getDeliveryPrice();
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Спасибо за заказ! Мы свяжемся с вами в ближайшее время.');
    setCart([]);
    setOrderForm({ name: '', phone: '', email: '', address: '', comment: '', deliveryMethod: 'courier', paymentMethod: 'card' });
    setActiveSection('home');
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Leaf" className="text-primary" size={32} />
              <span className="text-2xl font-bold text-primary">ЧайЛист</span>
            </div>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setActiveSection('home')}
                className={`text-lg font-medium transition-colors hover:text-primary ${
                  activeSection === 'home' ? 'text-primary' : 'text-foreground'
                }`}
              >
                Главная
              </button>
              <button
                onClick={() => setActiveSection('catalog')}
                className={`text-lg font-medium transition-colors hover:text-primary ${
                  activeSection === 'catalog' ? 'text-primary' : 'text-foreground'
                }`}
              >
                Каталог
              </button>
              <button
                onClick={() => setActiveSection('contact')}
                className={`text-lg font-medium transition-colors hover:text-primary ${
                  activeSection === 'contact' ? 'text-primary' : 'text-foreground'
                }`}
              >
                Контакты
              </button>
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative"
              >
                <Icon name="ShoppingCart" className="text-foreground hover:text-primary transition-colors" size={28} />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 text-xs">
                    {getTotalItems()}
                  </Badge>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-end">
          <div className="bg-card h-full w-full max-w-md shadow-2xl overflow-y-auto">
            <div className="sticky top-0 bg-card border-b p-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Корзина</h2>
              <button onClick={() => setIsCartOpen(false)}>
                <Icon name="X" size={24} />
              </button>
            </div>
            
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 px-4">
                <Icon name="ShoppingCart" size={64} className="text-muted-foreground mb-4" />
                <p className="text-xl text-muted-foreground text-center">Корзина пуста</p>
                <Button className="mt-6" onClick={() => { setIsCartOpen(false); setActiveSection('catalog'); }}>
                  Перейти в каталог
                </Button>
              </div>
            ) : (
              <>
                <div className="p-4 space-y-4">
                  {cart.map((item) => (
                    <Card key={item.id} className="p-4 border-2">
                      <div className="flex gap-4">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{item.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{item.weight}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Icon name="Minus" size={14} />
                              </Button>
                              <span className="font-medium w-8 text-center">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Icon name="Plus" size={14} />
                              </Button>
                            </div>
                            <span className="font-bold text-primary">{item.price * item.quantity} ₽</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="sticky bottom-0 bg-card border-t p-4 space-y-4">
                  <div className="flex items-center justify-between text-xl font-bold">
                    <span>Итого:</span>
                    <span className="text-primary">{getTotalPrice()} ₽</span>
                  </div>
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => { setIsCartOpen(false); setActiveSection('checkout'); }}
                  >
                    Оформить заказ
                    <Icon name="ArrowRight" size={20} className="ml-2" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {activeSection === 'home' && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-accent/20 px-6 py-2 rounded-full mb-6">
                <Icon name="Sparkles" size={20} className="text-accent" />
                <span className="font-medium text-accent">100% натуральные сборы</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Чайные сборы <br />
                <span className="text-primary">ручной работы</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Натуральные травяные сборы и премиальные чаи для вашего здоровья и удовольствия
              </p>
              <Button size="lg" className="text-lg px-8" onClick={() => setActiveSection('catalog')}>
                Смотреть каталог
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'catalog' && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Наши чайные сборы</h2>
              <p className="text-lg text-muted-foreground">Выберите свой идеальный вкус</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teas.map((tea) => (
                <Card key={tea.id} className="overflow-hidden border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={tea.image} 
                      alt={tea.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold">{tea.name}</h3>
                      <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                        {tea.weight}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-4 min-h-[60px]">{tea.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">{tea.price} ₽</span>
                      <Button className="gap-2" onClick={() => addToCart(tea)}>
                        Заказать
                        <Icon name="ShoppingCart" size={18} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === 'checkout' && (
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Оформление заказа</h2>
              <p className="text-lg text-muted-foreground">Заполните данные для доставки</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <Card className="p-6 border-2 mb-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Icon name="ShoppingBag" className="text-primary" />
                    Ваш заказ
                  </h3>
                  <div className="space-y-3 mb-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center py-2 border-b">
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">{item.weight} × {item.quantity}</p>
                        </div>
                        <span className="font-semibold">{item.price * item.quantity} ₽</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Товары ({getTotalItems()} шт.)</span>
                      <span>{getTotalPrice()} ₽</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Доставка</span>
                      <span>{getDeliveryPrice() === 0 ? 'Бесплатно' : `${getDeliveryPrice()} ₽`}</span>
                    </div>
                    <div className="flex justify-between text-2xl font-bold text-primary pt-2 border-t">
                      <span>Итого:</span>
                      <span>{getFinalPrice()} ₽</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-2 mb-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Icon name="Truck" className="text-primary" />
                    Способ доставки
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-primary transition-colors">
                      <input
                        type="radio"
                        name="delivery"
                        value="courier"
                        checked={orderForm.deliveryMethod === 'courier'}
                        onChange={(e) => setOrderForm({...orderForm, deliveryMethod: e.target.value})}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="font-semibold mb-1">Курьерская доставка</div>
                        <div className="text-sm text-muted-foreground">1-2 дня, бесплатно от 2000 ₽</div>
                        <div className="text-sm font-medium mt-1">
                          {getTotalPrice() >= 2000 ? 'Бесплатно' : '300 ₽'}
                        </div>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-primary transition-colors">
                      <input
                        type="radio"
                        name="delivery"
                        value="pickup"
                        checked={orderForm.deliveryMethod === 'pickup'}
                        onChange={(e) => setOrderForm({...orderForm, deliveryMethod: e.target.value})}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="font-semibold mb-1">Самовывоз</div>
                        <div className="text-sm text-muted-foreground">г. Москва, ул. Чайная, д. 15</div>
                        <div className="text-sm font-medium mt-1">Бесплатно</div>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-primary transition-colors">
                      <input
                        type="radio"
                        name="delivery"
                        value="express"
                        checked={orderForm.deliveryMethod === 'express'}
                        onChange={(e) => setOrderForm({...orderForm, deliveryMethod: e.target.value})}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="font-semibold mb-1">Экспресс-доставка</div>
                        <div className="text-sm text-muted-foreground">Доставка в течение 3-4 часов</div>
                        <div className="text-sm font-medium mt-1">400 ₽</div>
                      </div>
                    </label>
                  </div>
                </Card>

                <Card className="p-6 border-2">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Icon name="CreditCard" className="text-primary" />
                    Способ оплаты
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-primary transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={orderForm.paymentMethod === 'card'}
                        onChange={(e) => setOrderForm({...orderForm, paymentMethod: e.target.value})}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="font-semibold mb-1">Онлайн оплата картой</div>
                        <div className="text-sm text-muted-foreground">Visa, Mastercard, МИР</div>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-primary transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value="cash"
                        checked={orderForm.paymentMethod === 'cash'}
                        onChange={(e) => setOrderForm({...orderForm, paymentMethod: e.target.value})}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="font-semibold mb-1">Наличными курьеру</div>
                        <div className="text-sm text-muted-foreground">При получении заказа</div>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-primary transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value="sbp"
                        checked={orderForm.paymentMethod === 'sbp'}
                        onChange={(e) => setOrderForm({...orderForm, paymentMethod: e.target.value})}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="font-semibold mb-1">Система быстрых платежей</div>
                        <div className="text-sm text-muted-foreground">Перевод по номеру телефона</div>
                      </div>
                    </label>
                  </div>
                </Card>
              </div>

              <Card className="p-6 border-2">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Icon name="User" className="text-primary" />
                  Данные покупателя
                </h3>
                <form onSubmit={handleSubmitOrder} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Ваше имя <span className="text-destructive">*</span>
                    </label>
                    <Input 
                      required
                      placeholder="Иван Иванов" 
                      value={orderForm.name}
                      onChange={(e) => setOrderForm({...orderForm, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Телефон <span className="text-destructive">*</span>
                    </label>
                    <Input 
                      required
                      type="tel"
                      placeholder="+7 (999) 123-45-67" 
                      value={orderForm.phone}
                      onChange={(e) => setOrderForm({...orderForm, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email <span className="text-destructive">*</span>
                    </label>
                    <Input 
                      required
                      type="email"
                      placeholder="ivan@example.com" 
                      value={orderForm.email}
                      onChange={(e) => setOrderForm({...orderForm, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Адрес доставки <span className="text-destructive">*</span>
                    </label>
                    <Textarea 
                      required
                      placeholder="Город, улица, дом, квартира" 
                      rows={3}
                      value={orderForm.address}
                      onChange={(e) => setOrderForm({...orderForm, address: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Комментарий к заказу
                    </label>
                    <Textarea 
                      placeholder="Пожелания к доставке или вопросы" 
                      rows={3}
                      value={orderForm.comment}
                      onChange={(e) => setOrderForm({...orderForm, comment: e.target.value})}
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    Подтвердить заказ
                    <Icon name="Check" size={20} className="ml-2" />
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'contact' && (
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Свяжитесь с нами</h2>
              <p className="text-lg text-muted-foreground">Мы ответим на все ваши вопросы</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 border-2">
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Ваше имя</label>
                    <Input placeholder="Иван Иванов" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input type="email" placeholder="ivan@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Сообщение</label>
                    <Textarea placeholder="Ваш вопрос или комментарий" rows={5} />
                  </div>
                  <Button className="w-full" size="lg">
                    Отправить сообщение
                    <Icon name="Send" size={18} className="ml-2" />
                  </Button>
                </form>
              </Card>
              <div className="space-y-6">
                <Card className="p-6 border-2 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Icon name="MapPin" className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Адрес</h3>
                      <p className="text-muted-foreground">г. Москва, ул. Чайная, д. 15</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-6 border-2 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-secondary/10 p-3 rounded-lg">
                      <Icon name="Phone" className="text-secondary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Телефон</h3>
                      <p className="text-muted-foreground">+7 (999) 123-45-67</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-6 border-2 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-accent/10 p-3 rounded-lg">
                      <Icon name="Mail" className="text-accent" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Email</h3>
                      <p className="text-muted-foreground">info@chaylist.ru</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}

      <footer className="bg-card border-t py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Leaf" className="text-primary" size={28} />
                <span className="text-xl font-bold">ЧайЛист</span>
              </div>
              <p className="text-muted-foreground">Натуральные чайные сборы для вашего здоровья и удовольствия</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Разделы</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><button onClick={() => setActiveSection('home')} className="hover:text-primary transition-colors">Главная</button></li>
                <li><button onClick={() => setActiveSection('catalog')} className="hover:text-primary transition-colors">Каталог</button></li>
                <li><button onClick={() => setActiveSection('contact')} className="hover:text-primary transition-colors">Контакты</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>+7 (999) 123-45-67</li>
                <li>info@chaylist.ru</li>
                <li>г. Москва, ул. Чайная, д. 15</li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-muted-foreground">
            <p>© 2024 ЧайЛист. Все права защищены</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;