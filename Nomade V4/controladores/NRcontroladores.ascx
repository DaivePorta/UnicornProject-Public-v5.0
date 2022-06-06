<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NRcontroladores.ascx.vb" Inherits="controladores_NRcontroladores" %>
<%@ Register src="../vistas/partes/PCONGEN.ascx" tagname="PCONGEN" tagprefix="uc1" %>
<%@ Register src="../vistas/partes/PBARNAV.ascx" tagname="PBARNAV" tagprefix="uc3" %>
<%@ Register src="../vistas/partes/PMENU.ascx" tagname="PMENU" tagprefix="uc4" %>
<%--<asp:PlaceHolder ID="ph_cont" runat="server"></asp:PlaceHolder>--%>
<%--<%@ Register src="../vistas/partes/POBJTTI.ascx" tagname="POBJTTI" tagprefix="uc2" %>
--%><%--<asp:Label ID="Label1" runat="server" Text="Label1"></asp:Label>
--%>

<div id="cmenu" runat="server">
    <uc3:PBARNAV ID="PBARNAV1" runat="server"></uc3:PBARNAV>
    <uc4:PMENU ID="PMENU1" runat="server"></uc4:PMENU>
    <div class="e_der0">
        <div class="rightnomade">
<%--<div class="tit_centro">
--%>    
            <asp:Literal ID="lbl_titulo" runat="server"></asp:Literal>
            <%--</div>--%>
            <uc1:PCONGEN ID="PCONGEN1" runat="server"></uc1:PCONGEN>
        </div>
    </div>
</div>
<div id="barra" runat="server">
    <uc3:PBARNAV ID="PBARNAV2" runat="server"></uc3:PBARNAV>
    <div id="cont3" runat="server" class="rightnomade">
        <uc1:PCONGEN ID="PCONGEN3" runat="server"></uc1:PCONGEN>
    </div>
</div>
<div id="todo" runat="server">
    <div class="rightnomade">
        <uc1:PCONGEN ID="PCONGEN2" runat="server"></uc1:PCONGEN>
    </div>
</div>
