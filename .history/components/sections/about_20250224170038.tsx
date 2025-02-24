"use client";

import { motion } from 'framer-motion';
import { Code2, Palette, Lightbulb } from 'lucide-react';
import { SkillCard } from '../skill-card';

const skills = [
  {
    icon: <Code2 className="h-6 w-6" />,
    title: "Technical Direction",
    description: "AIを活用したWebアプリケーションの開発で、業務効率を飛躍的に向上させます",
    examples: [
      {
        title: "次世代ECプラットフォームの開発",
        description: "マイクロサービスアーキテクチャを採用し、スケーラビリティと保守性を実現"
      },
      {
        title: "AI活用業務システムの構築",
        description: "自然言語処理技術を用いた文書処理の自動化により、作業時間を70%削減"
      },
      {
        title: "開発プロセスの改善",
        description: "CI/CDパイプラインの構築とコードレビュー基準の策定で品質を向上"
      }
    ]
  },
  {
    icon: <Palette className="h-6 w-6" />,
    title: "Creative Direction",
    description: "デザインの提案と実装をリードし、ユーザー体験を向上させます",
    examples: [
      {
        title: "UXリデザインプロジェクト",
        description: "ユーザビリティテストに基づくUI改善で、コンバージョン率が25%向上"
      },
      {
        title: "デザインシステムの構築",
        description: "コンポーネントライブラリとガイドラインの整備で開発効率が30%改善"
      },
      {
        title: "ブランドアイデンティティ刷新",
                      src="/profile/icon_ToMo.jpg"
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <p className="text-lg text-muted-foreground">
                    8年以上の経験を持つWebディレクター。インパクトのあるデジタル体験の創造に情熱を注ぎ、
                    クリエイティブディレクション、技術リーダーシップ、戦略的プランニングを得意としています。
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                className="p-6 bg-background rounded-lg shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="mb-4 text-primary">{skill.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
                <p className="text-muted-foreground">{skill.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
