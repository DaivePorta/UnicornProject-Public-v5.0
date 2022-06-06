<%@ Control Language="VB" AutoEventWireup="false" CodeFile="PMENU.ascx.vb" Inherits="vistas_partes_PMENU" %>
<%@ Register src="NG/pusua.ascx" tagname="pusua" tagprefix="uc1" %>
<style type="text/css">
    .style1
    {
        width: 99px;
        height: 99px;
    }
</style>
<%--<div class="e_izq">
 <div class="tit_menu"><asp:Label ID="lbl_titulo" runat="server"></asp:Label></div>
 <div>
   <ul>
     <li><a href="?f=yggperf">Información Personal</a></li>
      <li>Foto Perfil</li>
      <li><a href="?f=ygmpass">Clave</a></li>
       <li>Correos</li>
       <li><a href="?f=yggtema">Tema</a></li>
   </ul>
 </div>
</div>--%>

<div style="padding-left:6px;">

<div id="lefaula">
<uc1:pusua ID="pusua1" 
        runat="server" />

<div class="mae_izq">
    <div style="border-right: 1px solid #f5f5f5; padding-bottom: 1px;">
        <div class="acad_menu" id="xx" runat="server">
            <div style="padding-top: 2px; padding-bottom: 2px; padding-top:15px;">
                <b>Menu de alumno</b></div>
            <div class="lh1">
            </div>
            <div style="margin-bottom: 5px;">
               
            </div>
            <div>
                <img src="recursos/ico/m_curso.gif" />&nbsp;<a href="?a=inicur">Mis cursos</a></div>
            <div id="opccurso" runat="server">
                <div>
                    <img src="recursos/ico/m_avisos.gif" />&nbsp;Avisos</div>
                <div>
                    <asp:Label ID="lbl_formacion" runat="server"></asp:Label>
                    <div class="acad_submenu" id="sm_formacion" runat="server">
                        <div class='<%=sm(0)%>'>
                            <img src="recursos/ico/m_temario.gif" />&nbsp;<a href="?a=inicurftl">Temario</a></div>
                        <div class='<%=sm(1)%>'>
                            <img src="recursos/ico/m_glosario.gif" />&nbsp;<a href="?a=inicurfgl">Glosario de términos</a>
                        </div>
                        <div class='<%=sm(2)%>'>
                            <img src="recursos/ico/m_referencia.gif" />&nbsp;<a href="?a=inicurfrl">Referencias
                                Bibliográficas</a>
                        </div>
                        <div class='<%=sm(3)%>'>
                            <img src="recursos/ico/m_faqs.gif" />&nbsp;<a href="?a=inicurffl">FAQS</a></div>
                    </div>
                </div>
                <div>
                    <img src="recursos/ico/m_evaluacion.gif" />&nbsp;Evaluación</div>
                <div>
                    <asp:Label ID="lbl_comunicacion" runat="server"></asp:Label>
                    <div class="acad_submenu" id="sm_comunicacion" runat="server">
                        <div class='<%=sm(0)%>'>
                            <img src="ico/m_inbox.gif" />&nbsp;<a href="?a=inicurcpd">Mensajes</a></div>
                        <div class='<%=sm(1)%>'>
                            <img src="recursos/ico/m_pregunta.gif" />&nbsp;<a href="?a=inicurcpd">Preguntas al Profesor</a></div>
                        <div class='<%=sm(2)%>'>
                            <img src="recursos/ico/m_profesor.gif" />&nbsp;<a href="?a=inicurcdl">Profesores</a></div>
                        <div class='<%=sm(3)%>'>
                            <img src="recursos/ico/m_alumno.gif" />&nbsp;<a href="?a=inicurcal">Alumnos</a></div>
                    </div>
                </div>
            </div>
            <div style="padding-bottom: 20px;">
            </div>
        </div>
        <div id="lbl_menu" runat="server">
        </div>
    </div>

</div>
</div>
</div>