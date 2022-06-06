<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NPP_DIRECCION.ascx.vb" Inherits="vistas_partes_NP_NPP_DIRECCION" %>
 <table width="900" border="0" cellspacing="0" cellpadding="1">
    <tr>
    <td>Sequencia</td>
    <td>
        <asp:TextBox runat="server" Width="15px" ID="TextBox5"></asp:TextBox>
    </td>
  </tr>
  <tr>
    <td>Ubicacion</td>
    <td>
        <asp:DropDownList ID="DropDownList6" runat="server" Width="120px" 
            AutoPostBack="True">
        </asp:DropDownList>
    </td>
  </tr>
  <tr>
    <td>Direccion</td>
    <td>
        <asp:TextBox runat="server" Width="300px" ID="txt_direccion"></asp:TextBox>
    </td>
  </tr>
  <tr>
    <td>Fecha Desde</td>
    <td>
        <asp:TextBox runat="server" Width="100px" ID="txt_fecha_desde"></asp:TextBox>
            <img ID="f_btn1" src="recursos/ico/calendario.jpg" /></td>
  </tr>
  <tr>
    <td>Fecha Hasta</td>
    <td>
        <asp:TextBox runat="server" Width="100px" ID="txt_fecha_hasta"></asp:TextBox>
            <img ID="f_btn2" src="recursos/ico/calendario.jpg" /></td>
  </tr>
  <tr>
    <td>Distrito</td>
    <td>
        <asp:TextBox runat="server" Width="50px" ID="txt_distrito_codigo"></asp:TextBox>
            &nbsp;<asp:TextBox runat="server" Width="285px" ID="txt_distrito_nombre"></asp:TextBox>
            <asp:ImageButton ID="btn_busca_distrito" runat="server" 
            ImageUrl="~/recursos/ico/select.gif" 
            OnClientClick="distritos(); return false" ToolTip="Buscar Distritos" 
            ImageAlign="Top" />
    </td>
  </tr>
  <tr>
    <td>Telefono</td>
    <td>
        <asp:TextBox runat="server" Width="50px" ID="txt_telefono_codigo"></asp:TextBox>
            &nbsp;<asp:TextBox runat="server" Width="285px" ID="txt_telefono_nombre"></asp:TextBox>
            <asp:ImageButton ID="btn_busca_telefono" runat="server" 
            ImageUrl="~/recursos/ico/select.gif" 
            OnClientClick="telefonos(); return false" ToolTip="Buscar Telefonos" 
            ImageAlign="Top" />
    </td>
  </tr>
  <tr>
    <td>Estado</td>
    <td>
        <asp:CheckBox ID="CheckBox2" runat="server" Checked="True" Text="Activo" />
    </td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>
        &nbsp;</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>
        <asp:Button ID="Button3" runat="server" Text="Grabar" CssClass="boton" />
            </td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>
        &nbsp;</td>
  </tr>
</table>