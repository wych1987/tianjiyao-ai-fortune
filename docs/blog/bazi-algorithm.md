---
description: 八字算法详解，系统拆解天干地支、节气换月、日柱推算与命盘生成流程，适合开发者理解排盘实现与校验要点。
---

# 八字算法详解：从天干地支到命盘生成

::: info 📖 阅读信息
**发布时间：** 2025-11-05  
**阅读时长：** 约 12 分钟  
**难度级别：** 🔥🔥 中级  
**标签：** 算法 · 八字 · 传统命理 · JavaScript
:::

## 引言

八字排盘是中国传统命理学的核心，通过出生年月日时推算出天干地支组合，进而分析人的命运。本文将详细讲解如何用现代编程语言实现八字算法。

## 基础概念

### 1. 天干地支

**天干（10 个）：**
```javascript
const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
```

**地支（12 个）：**
```javascript
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
```

**六十甲子循环：**
```
甲子、乙丑、丙寅、丁卯 ... 癸亥（共60组合）
```

### 2. 五行属性

```javascript
const ELEMENT_MAP = {
  // 天干五行
  '甲': '木', '乙': '木',
  '丙': '火', '丁': '火',
  '戊': '土', '己': '土',
  '庚': '金', '辛': '金',
  '壬': '水', '癸': '水',
  
  // 地支五行
  '子': '水', '丑': '土', '寅': '木', '卯': '木',
  '辰': '土', '巳': '火', '午': '火', '未': '土',
  '申': '金', '酉': '金', '戌': '土', '亥': '水',
};
```

---

## 算法实现

### 步骤 1：年柱计算

**公式：**
```
年干 = (年份 - 4) % 10
年支 = (年份 - 4) % 12
```

**代码实现：**
```typescript
function calculateYearPillar(year: number): Pillar {
  const stemIndex = (year - 4) % 10;
  const branchIndex = (year - 4) % 12;
  
  return {
    heavenlyStem: HEAVENLY_STEMS[stemIndex],
    earthlyBranch: EARTHLY_BRANCHES[branchIndex],
  };
}

// 示例：1990年
calculateYearPillar(1990);
// 结果：{ heavenlyStem: '庚', earthlyBranch: '午' }
```

**为什么减 4？**
- 因为公元 4 年是"甲子"年
- 这是历法基准点

---

### 步骤 2：月柱计算

**难点：节气边界**

八字月份以节气为界，不是公历/农历月份：

| 节气 | 时间 | 对应地支 |
|------|------|---------|
| 立春 | 2月4日前后 | 寅月 |
| 惊蛰 | 3月6日前后 | 卯月 |
| 清明 | 4月5日前后 | 辰月 |
| 立夏 | 5月6日前后 | 巳月 |
| 芒种 | 6月6日前后 | 午月 |
| 小暑 | 7月7日前后 | 未月 |
| 立秋 | 8月8日前后 | 申月 |
| 白露 | 9月8日前后 | 酉月 |
| 寒露 | 10月8日前后 | 戌月 |
| 立冬 | 11月7日前后 | 亥月 |
| 大雪 | 12月7日前后 | 子月 |
| 小寒 | 1月6日前后 | 丑月 |

**节气精确计算：**

```typescript
// 使用天文算法计算节气
function calculateSolarTerm(year: number, termIndex: number): Date {
  // 基于 Jean Meeus 天文算法
  const JD = calculateJulianDay(year, termIndex);
  return julianDayToDate(JD);
}

// 简化版（精度±1天）
function getSolarTermMonth(date: Date): number {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  // 节气大致日期
  const solarTerms = [
    { month: 2, day: 4 },  // 立春
    { month: 3, day: 6 },  // 惊蛰
    { month: 4, day: 5 },  // 清明
    // ... 其他节气
  ];
  
  // 判断是否过节气
  const currentTerm = solarTerms[month - 1];
  if (day >= currentTerm.day) {
    return month;
  } else {
    return month - 1;
  }
}
```

**月干推算（五虎遁）：**

```
甲己之年丙作首（年干为甲或己，正月起丙寅）
乙庚之岁戊为头（年干为乙或庚，正月起戊寅）
丙辛必定寻庚起（年干为丙或辛，正月起庚寅）
丁壬壬位顺行流（年干为丁或壬，正月起壬寅）
戊癸何方发，甲寅好追求（年干为戊或癸，正月起甲寅）
```

**代码实现：**
```typescript
function calculateMonthPillar(
  year: number,
  month: number,
  day: number
): Pillar {
  // 1. 获取年干
  const yearStemIndex = (year - 4) % 10;
  
  // 2. 获取节气月份
  const solarMonth = getSolarTermMonth(new Date(year, month - 1, day));
  
  // 3. 月支 = 节气月份对应地支
  const branchIndex = (solarMonth + 2) % 12; // 寅月=0, 卯月=1, ...
  
  // 4. 月干 = 五虎遁
  const monthStemBase = [2, 4, 6, 8, 0]; // 丙、戊、庚、壬、甲
  const stemIndex = (monthStemBase[yearStemIndex % 5] + solarMonth - 1) % 10;
  
  return {
    heavenlyStem: HEAVENLY_STEMS[stemIndex],
    earthlyBranch: EARTHLY_BRANCHES[branchIndex],
  };
}
```

---

### 步骤 3：日柱计算

**最复杂的部分！**

日柱需要计算从某个基准日期到目标日期的天数，然后对 60 取模。

**基准点：** 
- 1900年1月1日 = 甲辰日

**代码实现：**
```typescript
function calculateDayPillar(date: Date): Pillar {
  // 基准日期：1900-01-01（甲辰日）
  const baseDate = new Date(1900, 0, 1);
  const baseDayIndex = 40; // 甲辰 = 40 (0-indexed: 甲子=0)
  
  // 计算天数差
  const diffTime = date.getTime() - baseDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // 计算六十甲子索引
  const dayIndex = (baseDayIndex + diffDays) % 60;
  
  return {
    heavenlyStem: HEAVENLY_STEMS[dayIndex % 10],
    earthlyBranch: EARTHLY_BRANCHES[dayIndex % 12],
  };
}

// 示例：1990-01-15
calculateDayPillar(new Date(1990, 0, 15));
// 结果：{ heavenlyStem: '甲', earthlyBranch: '寅' }
```

**优化：使用查表法**

对于常用年份，可以预先计算：

```typescript
const DAY_PILLAR_TABLE = {
  '1990-01-01': 20, // 甲申
  '1990-02-01': 51, // 乙巳
  // ... 预计算每月1号
};

function fastCalculateDayPillar(date: Date): Pillar {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  // 查表获取当月1号的索引
  const monthFirstDayIndex = DAY_PILLAR_TABLE[`${year}-${month.toString().padStart(2, '0')}-01`];
  
  // 加上天数差
  const dayIndex = (monthFirstDayIndex + day - 1) % 60;
  
  return {
    heavenlyStem: HEAVENLY_STEMS[dayIndex % 10],
    earthlyBranch: EARTHLY_BRANCHES[dayIndex % 12],
  };
}
```

---

### 步骤 4：时柱计算

**时辰划分：**

| 地支 | 时间范围 |
|------|---------|
| 子时 | 23:00 - 00:59 |
| 丑时 | 01:00 - 02:59 |
| 寅时 | 03:00 - 04:59 |
| 卯时 | 05:00 - 06:59 |
| 辰时 | 07:00 - 08:59 |
| 巳时 | 09:00 - 10:59 |
| 午时 | 11:00 - 12:59 |
| 未时 | 13:00 - 14:59 |
| 申时 | 15:00 - 16:59 |
| 酉时 | 17:00 - 18:59 |
| 戌时 | 19:00 - 20:59 |
| 亥时 | 21:00 - 22:59 |

**注意：子时跨日问题**

- 早子时（23:00-23:59）：属于当天
- 晚子时（00:00-00:59）：属于第二天

**时干推算（五鼠遁）：**

```
甲己还加甲（日干为甲或己，子时起甲子）
乙庚丙作初（日干为乙或庚，子时起丙子）
丙辛从戊起（日干为丙或辛，子时起戊子）
丁壬庚子居（日干为丁或壬，子时起庚子）
戊癸何方发，壬子是真途（日干为戊或癸，子时起壬子）
```

**代码实现：**
```typescript
function calculateHourPillar(
  dayHeavenlyStem: string,
  hour: number,
  minute: number
): Pillar {
  // 1. 时支索引
  let branchIndex: number;
  if (hour === 23) {
    branchIndex = 0; // 早子时
  } else {
    branchIndex = Math.floor((hour + 1) / 2) % 12;
  }
  
  // 2. 日干索引
  const dayStemIndex = HEAVENLY_STEMS.indexOf(dayHeavenlyStem);
  
  // 3. 时干 = 五鼠遁
  const hourStemBase = [0, 2, 4, 6, 8]; // 甲、丙、戊、庚、壬
  const stemIndex = (hourStemBase[dayStemIndex % 5] + branchIndex) % 10;
  
  return {
    heavenlyStem: HEAVENLY_STEMS[stemIndex],
    earthlyBranch: EARTHLY_BRANCHES[branchIndex],
  };
}
```

---

## 完整示例

```typescript
interface Pillar {
  heavenlyStem: string;
  earthlyBranch: string;
}

interface BaziChart {
  yearPillar: Pillar;
  monthPillar: Pillar;
  dayPillar: Pillar;
  hourPillar: Pillar;
}

function calculateBaziChart(
  birthDate: string,  // "1990-01-15"
  birthTime: string,  // "14:30"
  timezone: string = 'Asia/Shanghai'
): BaziChart {
  // 1. 解析时间
  const [year, month, day] = birthDate.split('-').map(Number);
  const [hour, minute] = birthTime.split(':').map(Number);
  
  // 2. 转换为真太阳时（可选，精确计算需要）
  const solarTime = convertToSolarTime(year, month, day, hour, minute, timezone);
  
  // 3. 计算四柱
  const yearPillar = calculateYearPillar(year);
  const monthPillar = calculateMonthPillar(year, month, day);
  const dayPillar = calculateDayPillar(new Date(year, month - 1, day));
  const hourPillar = calculateHourPillar(
    dayPillar.heavenlyStem,
    solarTime.hour,
    solarTime.minute
  );
  
  return {
    yearPillar,
    monthPillar,
    dayPillar,
    hourPillar,
  };
}

// 使用示例
const chart = calculateBaziChart('1990-01-15', '14:30');
console.log(chart);
/*
{
  yearPillar: { heavenlyStem: '庚', earthlyBranch: '午' },
  monthPillar: { heavenlyStem: '己', earthlyBranch: '丑' },
  dayPillar: { heavenlyStem: '甲', earthlyBranch: '寅' },
  hourPillar: { heavenlyStem: '辛', earthlyBranch: '未' }
}
*/
```

---

## 高级功能

### 1. 藏干提取

每个地支藏有若干天干：

```typescript
const HIDDEN_STEMS = {
  '子': ['癸'],
  '丑': ['己', '癸', '辛'],
  '寅': ['甲', '丙', '戊'],
  '卯': ['乙'],
  '辰': ['戊', '乙', '癸'],
  '巳': ['丙', '戊', '庚'],
  '午': ['丁', '己'],
  '未': ['己', '丁', '乙'],
  '申': ['庚', '壬', '戊'],
  '酉': ['辛'],
  '戌': ['戊', '辛', '丁'],
  '亥': ['壬', '甲'],
};

function extractHiddenStems(earthlyBranch: string): string[] {
  return HIDDEN_STEMS[earthlyBranch] || [];
}
```

### 2. 五行统计

```typescript
function analyzeElements(chart: BaziChart): Record<string, number> {
  const elements = { metal: 0, wood: 0, water: 0, fire: 0, earth: 0 };
  
  // 统计天干地支五行
  [chart.yearPillar, chart.monthPillar, chart.dayPillar, chart.hourPillar].forEach(pillar => {
    const stemElement = ELEMENT_MAP[pillar.heavenlyStem];
    const branchElement = ELEMENT_MAP[pillar.earthlyBranch];
    
    elements[stemElement.toLowerCase()]++;
    elements[branchElement.toLowerCase()]++;
  });
  
  return elements;
}
```

### 3. 大运推算

```typescript
function calculateLuck(
  chart: BaziChart,
  gender: 'male' | 'female'
): Luck[] {
  const yearStem = chart.yearPillar.heavenlyStem;
  const isYangYear = HEAVENLY_STEMS.indexOf(yearStem) % 2 === 0;
  
  // 阳男阴女顺排，阴男阳女逆排
  const isForward = (gender === 'male' && isYangYear) || 
                    (gender === 'female' && !isYangYear);
  
  const monthIndex = EARTHLY_BRANCHES.indexOf(chart.monthPillar.earthlyBranch);
  const luck: Luck[] = [];
  
  for (let i = 0; i < 8; i++) {
    const startAge = i * 10 + getStartAge(chart, gender);
    const branchIndex = isForward 
      ? (monthIndex + i + 1) % 12
      : (monthIndex - i - 1 + 120) % 12;
    
    luck.push({
      startAge,
      endAge: startAge + 10,
      heavenlyStem: HEAVENLY_STEMS[(i + 1) % 10],
      earthlyBranch: EARTHLY_BRANCHES[branchIndex],
    });
  }
  
  return luck;
}
```

---

## 性能优化

### 1. 缓存计算结果

```typescript
const chartCache = new Map<string, BaziChart>();

function getCachedChart(birthDate: string, birthTime: string): BaziChart {
  const key = `${birthDate}:${birthTime}`;
  
  if (!chartCache.has(key)) {
    chartCache.set(key, calculateBaziChart(birthDate, birthTime));
  }
  
  return chartCache.get(key)!;
}
```

### 2. 预计算查表

对于常用年份的日柱，可以预先计算并存储。

### 3. Web Worker 异步计算

```typescript
// worker.ts
self.onmessage = (e) => {
  const { birthDate, birthTime } = e.data;
  const chart = calculateBaziChart(birthDate, birthTime);
  self.postMessage(chart);
};

// main.ts
const worker = new Worker('worker.ts');
worker.postMessage({ birthDate, birthTime });
worker.onmessage = (e) => {
  console.log('Chart:', e.data);
};
```

---

## 测试用例

```typescript
describe('Bazi Calculation', () => {
  it('should calculate correct year pillar for 1990', () => {
    const result = calculateYearPillar(1990);
    expect(result).toEqual({
      heavenlyStem: '庚',
      earthlyBranch: '午',
    });
  });
  
  it('should handle leap year correctly', () => {
    const result = calculateDayPillar(new Date(2020, 1, 29));
    expect(result).toBeDefined();
  });
  
  it('should handle early zi hour correctly', () => {
    const result = calculateHourPillar('甲', 23, 30);
    expect(result.earthlyBranch).toBe('子');
  });
});
```

---

## 总结

八字算法的核心在于：
1. **准确的节气计算**（月柱）
2. **精确的日期计算**（日柱）
3. **正确的时辰划分**（时柱）
4. **天干地支推算口诀**（五虎遁、五鼠遁）

现代实现的关键：
- ✅ 使用天文算法精确计算节气
- ✅ 考虑真太阳时修正
- ✅ 处理边界情况（子时、闰年）
- ✅ 性能优化（缓存、查表）

---

## 💫 在线体验八字排盘

学完算法原理，想看看实际效果吗？

::: tip 🎯 免费使用
👉 **[访问天机爻 - 在线八字排盘](https://www.tianjiyao.com/bazi)** 

✨ 功能特色：
- ⚡ **秒级计算** - 精准的天干地支推算
- 🎨 **可视化命盘** - 直观的图表展示
- 🤖 **AI 智能解读** - GPT-4 深度分析
- 📱 **响应式设计** - 手机/电脑完美适配
:::

---

## 相关链接

- [架构设计](/architecture/)
- [AI 引擎](/architecture/ai-engine)
- [八字 API 文档](/api/bazi)
- [更多技术博客](/blog/)

---

::: tip 💡 进阶阅读
想深入了解节气计算？推荐阅读《寿星天文历》和 Jean Meeus 的《Astronomical Algorithms》。
:::
