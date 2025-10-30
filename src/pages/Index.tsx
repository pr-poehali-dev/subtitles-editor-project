import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const teas = [
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

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Leaf" className="text-primary" size={32} />
              <span className="text-2xl font-bold text-primary">ЧайЛист</span>
            </div>
            <div className="flex gap-6">
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
            </div>
          </div>
        </div>
      </nav>

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
                      <Button className="gap-2">
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
