"use client";

import { useEffect, useState } from "react";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { apiUrl } from "@/lib/api";
import Link from "next/link";
import {
  FileText,
  Eye,
  TrendingUp,
  Clock,
  Plus,
  List,
  Settings,
} from "lucide-react";

interface DashboardStats {
  totalPosts: number;
  recentPosts: { id: number; title: string; slug: string; createdAt: string }[];
}

interface BlogPostSummary {
  id: number;
  title: string;
  slug: string;
  createdAt: string;
}

export default function AdminPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(apiUrl("/blog"));
        if (res.ok) {
          const posts: BlogPostSummary[] = await res.json();
          setStats({
            totalPosts: posts.length,
            recentPosts: posts.slice(0, 5).map((post) => ({
              id: post.id,
              title: post.title,
              slug: post.slug,
              createdAt: post.createdAt,
            })),
          });
        }
      } catch (error) {
        getErrorMessage(error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="flex flex-col md:max-w-[70vw] md:px-12 px-1 py-4">
      {/* Cabeçalho */}
      <div className="flex flex-row justify-between items-center mb-5">
        <h2 className="text-[1.6rem] md:text-[1.7rem] text-center md:text-left font-bold leading-none m-0">
          Dashboard
        </h2>
      </div>
      {/* Cards de Estatísticas */}
      <section className="grid grid-cols-1 grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={<FileText className="text-blue-500" size={24} />}
          label="Total de Posts"
          value={loading ? "..." : String(stats?.totalPosts ?? 0)}
          bgColor="bg-blue-50"
        />
        <StatCard
          icon={<Eye className="text-green-500" size={24} />}
          label="Visualizações"
          value="—"
          bgColor="bg-green-50"
        />
        <StatCard
          icon={<TrendingUp className="text-purple-500" size={24} />}
          label="Cliques em Comprar"
          value="—"
          bgColor="bg-purple-50"
        />
        <StatCard
          icon={<Clock className="text-orange-500" size={24} />}
          label="Último Post"
          value={
            loading
              ? "..."
              : stats?.recentPosts[0]
                ? formatRelativeDate(stats.recentPosts[0].createdAt)
                : "Nenhum"
          }
          bgColor="bg-orange-50"
        />
      </section>

      {/* Ações Rápidas */}
      <section className="flex flex-col gap-3 md:gap-4 w-full">
        <h2 className="text-[1.6rem] md:text-[1.7rem] font-semibold pt-8 md:pt-12">
          Ações Rápidas
        </h2>
        <div className="flex flex-wrap gap-3">
          <QuickActionButton
            href="/admin/blog/new-post"
            icon={<Plus size={18} />}
            label="Novo Post"
            variant="primary"
          />
          <QuickActionButton
            href="/admin/blog/list-posts"
            icon={<List size={18} />}
            label="Visualizar"
            variant="secondary"
          />
          <QuickActionButton
            href="/admin/blog/manage"
            icon={<Settings size={18} />}
            label="Gerenciar"
            variant="secondary"
          />
        </div>
      </section>

      {/* Postagens recentes */}
      <section className="flex flex-col gap-3 md:gap-4 w-full">
        <h2 className="text-[1.6rem] md:text-[1.7rem] font-semibold pt-8 md:pt-12">
          Últimas Postagens
        </h2>
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-4 text-gray-500 text-sm">Carregando...</div>
          ) : stats?.recentPosts && stats.recentPosts.length > 0 ? (
            <ul className="divide-y divide-gray-100">
              {stats.recentPosts.map((post) => (
                <li key={post.id}>
                  <Link
                    href={`/admin/blog/${post.id}`}
                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-800 text-sm font-medium truncate max-w-[70%] text-[1.1rem]">
                      {post.title}
                    </span>
                    <span className="text-gray-400 text-[1rem]">
                      {new Date(post.createdAt).toLocaleDateString("pt-BR")}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-gray-500 text-sm">
              Nenhum post encontrado.{" "}
              <Link
                href="/admin/blog/new-post"
                className="text-blue-500 hover:underline"
              >
                Criar primeiro post
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  bgColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  bgColor: string;
}) {
  return (
    <div
      className={`${bgColor} rounded-xl p-4 flex flex-col border border-gray-100 text-center`}
    >
      <div className="flex items-center gap-2 justify-center">
        {icon}
        <span className="text-[1rem] md:text-[0.8rem] text-gray-500 uppercase whitespace-nowrap">
          {label}
        </span>
      </div>
      <span className="text-[1.5rem] md:text-[1.3rem] font-bold text-gray-700 pt-5">
        {value}
      </span>
    </div>
  );
}

function QuickActionButton({
  href,
  icon,
  label,
  variant,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  variant: "primary" | "secondary";
}) {
  const baseClasses =
    "flex w-39 items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-[1.3rem] md:text-[1.1rem] transition-colors";
  const variantClasses =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-300 dark:text-blue-950 dark:hover:bg-blue-400"
      : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700";

  return (
    <Link href={href} className={`${baseClasses} ${variantClasses}`}>
      {icon}
      {label}
    </Link>
  );
}

function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Hoje";
  if (diffDays === 1) return "Ontem";
  if (diffDays < 7) return `${diffDays} dias atrás`;
  return date.toLocaleDateString("pt-BR");
}
